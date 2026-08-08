export { validation_templatepatternunknownslot3 as "validation.templatePatternUnknownSlot" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Validation_Templatepatternunknownslot3Inputs = {
    slot: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "The output pattern references \"{slot}\", which is not one of the template's slots." |
*
* @param {Validation_Templatepatternunknownslot3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const validation_templatepatternunknownslot3: ((inputs: Validation_Templatepatternunknownslot3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Validation_Templatepatternunknownslot3Inputs, {
    locale?: "en" | "id";
}, {}>;
