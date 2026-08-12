export { send_prefilldeletedone2 as "send.prefillDeletedOne" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Send_Prefilldeletedone2Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{count} previously failed recipient was deleted." |
*
* @param {Send_Prefilldeletedone2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const send_prefilldeletedone2: ((inputs: Send_Prefilldeletedone2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Send_Prefilldeletedone2Inputs, {
    locale?: "en" | "id";
}, {}>;
