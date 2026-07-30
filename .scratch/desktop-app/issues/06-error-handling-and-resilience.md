# 06: Error handling & batch resilience

Type: grilling
Status: resolved
Assignee: Akbar Ramadhan Yusri
Blocked by: 04

## Question

Define the error and resilience model for batch operations, informed by the job model from ticket 04.

## Answer

### 1. Per-Recipient Failure

**Continue the batch.** Failed recipients are marked `failed` with the error reason (SMTP reject code, full inbox, bad address). The live progress log shows failures inline ("✗ bob@co.com failed: mailbox full"), and the final summary shows "138 sent, 4 failed." Failed recipients appear in the Logs detail view and can be retried individually or in bulk.

### 2. SMTP Disconnection Mid-Batch

**Auto-retry 3 times with exponential backoff (1s, 2s, 4s).** If all retries fail, pause the job and show an error banner: "Connection lost. 87/200 sent. Resume when ready." The user clicks Resume to re-establish the connection and continue from recipient 88. Already-sent emails are never re-sent (no duplicates).

Each Send Job tracks a **cursor** — the index of the last successfully-sent recipient — persisted to SQLite after each successful send. This cursor is what Resume reads to know where to pick up.

### 3. Rate Limiting Enforcement

Matches current CLI behavior: **1 email per second default** (configurable 500ms–5000ms slider in Settings, with a per-send override in the Compose wizard). Implemented as a simple `sleep(delay)` between each recipient dispatch. No burst mode or complex batching for v1.

### 4. App Quit Mid-Send

**Cursor persisted to SQLite after each successful send.** On restart, the app detects any Send Job with status `in-progress` and shows a banner: "You have an unfinished send. 87/200 sent. Resume?" If the user resumes, it picks up from the cursor (recipient 88). If they dismiss, the job stays as-is (partial) and failed recipients can be retried from Logs.

### 5. Attachment Generation Failure

**Skip that recipient, mark as `failed` with reason, continue the rest.** At the end of the Generate step, the user sees "137 PDFs generated, 3 failed" with the list of failures and reasons (bad template slot, missing data, DOCX parse error). The user can fix the underlying issue and re-generate just the failures.

**The Send step only sends to recipients whose PDFs generated successfully** — no one receives an email with a broken or missing attachment.

### 6. Validation Before Send

**The Generate step is the validation.** Since Generate runs before Send (wizard step 5 before step 6), and failed-generation recipients are excluded from Send, the Send step only fires for confirmed-good attachments.

A **pre-flight check** runs when the user clicks "Send All":
- Verify SMTP connection works (connect + auth)
- Confirm at least one recipient has a generated attachment
- If either fails, stop before sending anything and show the error

Per-recipient attachment validation is NOT re-checked at Send time — that already happened during Generate.

### Rust Error Types Needed

```rust
enum GenerateError {
    TemplateNotFound(Uuid),
    SlotMissing { template_id: Uuid, slot_name: String },
    DocxFillFailed { recipient_id: Uuid, reason: String },
    DocxToHtmlFailed { reason: String },
    PdfConversionFailed { reason: String },
}

enum SendError {
    SmtpConnectFailed { reason: String },
    SmtpAuthFailed { reason: String },
    SmtpSendFailed { recipient_id: Uuid, reason: String },
    AttachmentNotFound { recipient_id: Uuid, path: String },
    RateLimitExceeded,
}

enum JobStatus {
    Pending,
    Generating,     // Generate job in progress
    Generated,      // Generate job complete (all or partial success)
    Sending,        // Send job in progress
    Paused,         // Send job paused (connection lost, user paused)
    Completed,      // Send job finished (all or partial success)
    Cancelled,      // User cancelled
}

struct SendCursor {
    job_id: Uuid,
    last_sent_index: u32,
    total_recipients: u32,
    updated_at: DateTime,
}
```
