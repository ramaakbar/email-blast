export { smtp_connectionok1 as "smtp.connectionOk" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Smtp_Connectionok1Inputs = {};
/**
* | output |
* | --- |
* | "Connection OK - the server accepted the credentials." |
*
* @param {Smtp_Connectionok1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const smtp_connectionok1: ((inputs?: Smtp_Connectionok1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Smtp_Connectionok1Inputs, {
    locale?: "en" | "id";
}, {}>;
