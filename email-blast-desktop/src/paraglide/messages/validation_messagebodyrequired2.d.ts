export { validation_messagebodyrequired2 as "validation.messageBodyRequired" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Validation_Messagebodyrequired2Inputs = {};
/**
* | output |
* | --- |
* | "HTML body is required." |
*
* @param {Validation_Messagebodyrequired2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const validation_messagebodyrequired2: ((inputs?: Validation_Messagebodyrequired2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Validation_Messagebodyrequired2Inputs, {
    locale?: "en" | "id";
}, {}>;
