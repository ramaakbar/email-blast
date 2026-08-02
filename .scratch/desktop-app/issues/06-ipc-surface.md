# 06: IPC surface & typed channels

Type: grilling
Status: resolved
Blocked by: 01

## Question

Lock the IPC contract that replaces Tauri commands — the renderer's only door into the main process.

Decisions to make (grill with the user, referencing the old spec's command surface in `archive/tauri-era/spec.md` and the screens from archived ticket 05):

- **Shape**: contextBridge-exposed API object (e.g. `window.api.send.getJobStatus(jobId)`) vs raw `ipcRenderer.invoke` channel strings; channel naming convention
- **Progress**: request/response for commands vs `webContents.send` event channels for live progress (send job per-recipient updates, generate progress) — channel names and payload shapes
- **Typing**: shared TypeScript types between main/preload/renderer — hand-written shared module vs generated (zod schemas or similar). Error propagation across IPC (Effect-typed errors serializing cleanly — coordinates with ticket 04)
- **Security posture**: contextIsolation on, sandbox on, no Node in renderer, preload as the only bridge — confirm the minimal surface (what the renderer genuinely needs to call, nothing else)
- **Versioning**: what happens when the contract grows (WhatsApp seam) — additive-only convention?

Deliver: the agreed API surface (channel list + payload shapes), which becomes the spec's IPC section for /to-spec. This ticket is HITL — the grilling must happen with the user, not unilaterally.

## Answer

Decisions (grilled with the user, 2026-08-02):

1. **Shape**: contextBridge-exposed typed API object `window.api.<domain>.<method>`, not raw `ipcRenderer.invoke` strings in the renderer. Each method maps to a namespaced channel (`import:read`, `recipients:list`, ...) defined as constants in one shared module. Renderer never sees channel strings or `ipcRenderer`.
2. **Security posture**: contextIsolation on, sandbox on, nodeIntegration off, preload as the only bridge (committed in ticket 01). Preload exposes exactly the listed methods, no wildcard or generic passthrough. Main's IPC wrapper validates `event.senderFrame` is a top-level frame of our own webContents (~5-line validateSender recipe). No remote content loaded at all.
3. **Progress events**: four wire channels reusing the archived spec's payloads - `generate-progress`, `send-progress`, `job-paused`, `job-completed`. The completed event gains `kind: "generate" | "send"` plus the relevant counts (the one change from the old spec). Preload exposes `window.api.onX(cb) -> unsubscribe` subscriptions; renderer never touches `ipcRenderer.on`. Events are deltas, not the source of truth - every state is also fetchable via request/response, so dropped events under backpressure (ticket 04's bounded queue, drop-oldest) self-heal.
4. **Typing**: Effect Schema as the single source of truth for ALL payloads in `src/shared/ipc.ts` - types derived via `Schema.Type<...>`, never hand-written alongside. Main's `ipcMain.handle` wrapper decodes every renderer-to-main payload at the boundary; malformed calls become typed ParseErrors. Errors keep the ticket-04 tagged envelope (SendError/GenerateError), now just more schemas in the same module. Main-to-renderer is typed without symmetric decode (data already validated at the SQLite layer). No codegen, no zod - schemas ARE the contract.
5. **Versioning**: additive-only convention - channels and fields are added, never removed or renamed; fields demote to `optional` rather than delete. Breaking changes only via a deliberate `API_VERSION` bump plus a migration pass (rare, acceptable pre-1.0). `API_VERSION` constant in `src/shared/ipc.ts`, dev-asserted agreement between preload and main. WhatsApp seam later adds channels, never modifies existing ones.

### Agreed API surface (becomes the spec's IPC section for /to-spec)

All methods are `ipcRenderer.invoke` under the hood on one namespaced channel each. All payloads are Effect Schemas in `src/shared/ipc.ts`.

| Domain | Method | Returns |
|---|---|---|
| import | `read(excelPath)` | `ImportPreview { recipients, skippedDuplicates, warnings }` |
| | `commit(recipients, columnMapping)` | `{ imported, duplicatesSkipped }` |
| recipients | `list({ search?, importBatch?, page, pageSize })` | `PaginatedRecipients` |
| | `get(id)` | `Recipient` |
| | `delete(ids)` | `count` |
| templates | `list()` / `get(id)` | `Template[]` / `Template` |
| | `create({ name, filePath, slots, outputPattern })` / `update(...)` | `Template` |
| | `delete(id)` | `void` |
| | `scanSlots(filePath)` | `string[]` |
| jobs | `startGenerate({ templateId, recipientIds })` | `GenerateJob` |
| | `runGenerate(jobId)` | `void` |
| | `getGenerateStatus(jobId)` / `cancelGenerate(jobId)` | `GenerateJob` / `void` |
| | `startSend({ generateJobId?, recipientIds, smtpProfileId?, smtpOverride?, subject, bodyHtml, senderName, senderAddress, attachments, delayMs })` | `SendJob` |
| | `runSend(jobId)` / `pause(jobId)` / `resume(jobId)` / `cancel(jobId)` | `void` |
| | `getSendStatus(jobId)` | `SendJob` |
| logs | `list({ statusFilter?, dateFrom?, dateTo? })` | `SendJobSummary[]` |
| | `detail(jobId)` | `SendJob` |
| | `retryFailed(jobId, recipientIds)` | `SendJob` |
| smtp | `list()` / `create(...)` / `update(...)` / `delete(id)` | per-shape |
| | `test({ host, port, username, password })` | `void` (throws typed error) |
| settings | `get(key)` / `set(key, value)` | `string?` / `void` |
| system | `checkLibreOffice()` | `string?` (path or null) |

Events (main to renderer via `webContents.send`; each `onX(cb)` returns an unsubscribe function):

- `onGenerateProgress(cb)` - `{ jobId, current, total, status, recipientId, error? }`
- `onSendProgress(cb)` - `{ jobId, current, total, status, recipientId, messageId?, error? }`
- `onJobPaused(cb)` - `{ jobId, reason, lastIndex }`
- `onJobCompleted(cb)` - `{ jobId, kind: "generate" | "send", counts }`
