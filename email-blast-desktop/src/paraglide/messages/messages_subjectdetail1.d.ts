export { messages_subjectdetail1 as "messages.subjectDetail" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Messages_Subjectdetail1Inputs = {};
/**
* | output |
* | --- |
* | "Subject" |
*
* @param {Messages_Subjectdetail1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const messages_subjectdetail1: ((inputs?: Messages_Subjectdetail1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Messages_Subjectdetail1Inputs, {
    locale?: "en" | "id";
}, {}>;
