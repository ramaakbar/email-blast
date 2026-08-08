export { app_backendunreachable1 as "app.backendUnreachable" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type App_Backendunreachable1Inputs = {};
/**
* | output |
* | --- |
* | "Could not reach the app backend. The database may not be ready yet." |
*
* @param {App_Backendunreachable1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const app_backendunreachable1: ((inputs?: App_Backendunreachable1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<App_Backendunreachable1Inputs, {
    locale?: "en" | "id";
}, {}>;
