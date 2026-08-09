export { messages_bodydetail1 as "messages.bodyDetail" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Messages_Bodydetail1Inputs = {};
/**
* | output |
* | --- |
* | "HTML body" |
*
* @param {Messages_Bodydetail1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const messages_bodydetail1: ((inputs?: Messages_Bodydetail1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Messages_Bodydetail1Inputs, {
    locale?: "en" | "id";
}, {}>;
