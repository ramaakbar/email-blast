export { send_prefillretryone2 as "send.prefillRetryOne" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Send_Prefillretryone2Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Retry pre-filled from Logs: {count} failed recipient, the same message and SMTP." |
*
* @param {Send_Prefillretryone2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const send_prefillretryone2: ((inputs: Send_Prefillretryone2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Send_Prefillretryone2Inputs, {
    locale?: "en" | "id";
}, {}>;
