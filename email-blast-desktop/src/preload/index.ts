import { contextBridge, ipcRenderer, webUtils } from "electron";
import { API_VERSION, IPC } from "../shared/ipc-channels";
import type { Api } from "../shared/ipc";

/**
 * The contextBridge API skeleton. Exactly the methods in `Api` are
 * exposed - no wildcard passthrough, no channel strings in the renderer.
 */
const api: Api = {
  system: {
    ping: () => ipcRenderer.invoke(IPC["system:ping"]),
    checkLibreOffice: () => ipcRenderer.invoke(IPC["system:check-libreoffice"]),
    pickFolder: () => ipcRenderer.invoke(IPC["system:pick-folder"]),
    pickExcelFile: () => ipcRenderer.invoke(IPC["system:pick-excel-file"]),
    getPathForFile: (file) => webUtils.getPathForFile(file),
    getAppInfo: () => ipcRenderer.invoke(IPC["system:get-app-info"]),
  },
  settings: {
    get: (key) => ipcRenderer.invoke(IPC["settings:get"], key),
    set: (key, value) => ipcRenderer.invoke(IPC["settings:set"], key, value),
  },
  import: {
    read: (excelPath) => ipcRenderer.invoke(IPC["import:read"], excelPath),
    commit: (payload) => ipcRenderer.invoke(IPC["import:commit"], payload),
  },
  recipients: {
    list: (payload) => ipcRenderer.invoke(IPC["recipients:list"], payload),
    get: (id) => ipcRenderer.invoke(IPC["recipients:get"], id),
    delete: (ids) => ipcRenderer.invoke(IPC["recipients:delete"], ids),
    listBatches: () => ipcRenderer.invoke(IPC["recipients:list-batches"]),
  },
};

if (process.contextIsolated) {
  contextBridge.exposeInMainWorld("api", api);
} else {
  // Our webPreferences always enable contextIsolation; refuse to run weakened.
  throw new Error("[preload] contextIsolation is disabled - refusing to expose the API");
}

// Dev-only handshake: report our API_VERSION to main so it can assert
// preload and main agree (stale-bundle guard). Never triggered in packaged builds.
ipcRenderer.on(IPC["dev:api-version-check"], () => {
  ipcRenderer.send(IPC["dev:api-version-report"], API_VERSION);
});
