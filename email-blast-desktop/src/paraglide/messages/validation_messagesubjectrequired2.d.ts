export { validation_messagesubjectrequired2 as "validation.messageSubjectRequired" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Validation_Messagesubjectrequired2Inputs = {};
/**
* | output |
* | --- |
* | "Subject is required." |
*
* @param {Validation_Messagesubjectrequired2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const validation_messagesubjectrequired2: ((inputs?: Validation_Messagesubjectrequired2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Validation_Messagesubjectrequired2Inputs, {
    locale?: "en" | "id";
}, {}>;
