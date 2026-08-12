export { send_prefilldeletedother2 as "send.prefillDeletedOther" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Send_Prefilldeletedother2Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{count} previously failed recipients were deleted." |
*
* @param {Send_Prefilldeletedother2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const send_prefilldeletedother2: ((inputs: Send_Prefilldeletedother2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Send_Prefilldeletedother2Inputs, {
    locale?: "en" | "id";
}, {}>;
