export { validation_messagetemplatenamerequired3 as "validation.messageTemplateNameRequired" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Validation_Messagetemplatenamerequired3Inputs = {};
/**
* | output |
* | --- |
* | "Message template name is required." |
*
* @param {Validation_Messagetemplatenamerequired3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const validation_messagetemplatenamerequired3: ((inputs?: Validation_Messagetemplatenamerequired3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Validation_Messagetemplatenamerequired3Inputs, {
    locale?: "en" | "id";
}, {}>;
