// Development loop, without an orchestration package (ADR-0010): the
// renderer runs on its Vite dev server (HMR), main and preload rebuild in
// watch mode, Electron restarts when a main-process file changes and the
// renderer reloads when a preload file changes - what Electron Forge's Vite
// plugin used to provide. Modelled on cawa-93/vite-electron-builder.
import { spawn } from "node:child_process";
import electronPath from "electron";
import { build, createServer } from "vite";

const mode = "development";

// The renderer dev server comes first: the main process needs its URL before
// Electron starts. `VITE_DEV_SERVER_URL` is inherited by the Electron child.
const renderer = await createServer({ mode, configFile: "vite.renderer.config.mjs" });
await renderer.listen();
const devServerUrl = renderer.resolvedUrls?.local?.[0];
if (devServerUrl === undefined) {
  throw new Error("the renderer dev server reported no local URL");
}
process.env.VITE_DEV_SERVER_URL = devServerUrl;
console.log(`renderer dev server: ${devServerUrl}`);

/** @type {import("node:child_process").ChildProcess | null} */
let electron = null;
/** @type {(() => void) | null} */
let electronExit = null;
/** @type {import("vite").RollupWatcher[]} */
const watchers = [];
let closing = false;

async function shutdown(code = 0) {
  if (closing) return;
  closing = true;
  if (electron !== null) {
    electron.kill("SIGINT");
    electron = null;
  }
  for (const watcher of watchers) await watcher.close();
  await renderer.close();
  process.exit(code);
}

/** Restart Electron on every main-process rebuild; the app quitting ends the loop. */
function restartElectron() {
  if (electron !== null && electronExit !== null) {
    // The replaced process must not take the dev loop down with it - the
    // removed listener is the exact one added below.
    electron.removeListener("exit", electronExit);
    electronExit = null;
    electron.kill("SIGINT");
  }
  electron = spawn(String(electronPath), ["."], { stdio: "inherit" });
  electronExit = () => void shutdown();
  electron.addListener("exit", electronExit);
}

/** Build in watch mode, with dev-only plugins injected. */
async function watch(configFile, plugins) {
  const watcher = await build({ mode, configFile, plugins, build: { watch: {} } });
  watchers.push(watcher);
  return watcher;
}

/** Resolve once a watcher completed a build (or reject on the first error). */
function firstBuild(watcher) {
  return new Promise((resolve, reject) => {
    watcher.on("event", (event) => {
      if (event.code === "END") resolve();
      else if (event.code === "ERROR") reject(event.error);
    });
  });
}

// Preload first: Electron must find out/preload/index.js when it starts.
const preloadWatcher = await watch("vite.preload.config.mjs", [
  {
    name: "dev:reload-renderer",
    writeBundle() {
      renderer.ws.send({ type: "full-reload" });
    },
  },
]);
await firstBuild(preloadWatcher);

// The first main build starts Electron; later ones restart it.
await watch("vite.main.config.mjs", [
  {
    name: "dev:restart-electron",
    writeBundle() {
      restartElectron();
    },
  },
]);

process.on("SIGINT", () => void shutdown());
process.on("SIGTERM", () => void shutdown());
