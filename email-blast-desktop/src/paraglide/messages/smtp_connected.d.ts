export { smtp_connected as "smtp.connected" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Smtp_ConnectedInputs = {};
/**
* | output |
* | --- |
* | "Connected - the server accepted these credentials." |
*
* @param {Smtp_ConnectedInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const smtp_connected: ((inputs?: Smtp_ConnectedInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Smtp_ConnectedInputs, {
    locale?: "en" | "id";
}, {}>;
