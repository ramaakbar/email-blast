export { send_attachmentssummary1 as "send.attachmentsSummary" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Send_Attachmentssummary1Inputs = {
    with: NonNullable<unknown>;
    without: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{with} with PDF · {without} without" |
*
* @param {Send_Attachmentssummary1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const send_attachmentssummary1: ((inputs: Send_Attachmentssummary1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Send_Attachmentssummary1Inputs, {
    locale?: "en" | "id";
}, {}>;
