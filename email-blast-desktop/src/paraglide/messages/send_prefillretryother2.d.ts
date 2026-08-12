export { send_prefillretryother2 as "send.prefillRetryOther" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Send_Prefillretryother2Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Retry pre-filled from Logs: {count} failed recipients, the same message and SMTP." |
*
* @param {Send_Prefillretryother2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const send_prefillretryother2: ((inputs: Send_Prefillretryother2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Send_Prefillretryother2Inputs, {
    locale?: "en" | "id";
}, {}>;
