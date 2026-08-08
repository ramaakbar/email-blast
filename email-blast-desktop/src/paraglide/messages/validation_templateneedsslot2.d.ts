export { validation_templateneedsslot2 as "validation.templateNeedsSlot" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Validation_Templateneedsslot2Inputs = {};
/**
* | output |
* | --- |
* | "A template needs at least one slot." |
*
* @param {Validation_Templateneedsslot2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const validation_templateneedsslot2: ((inputs?: Validation_Templateneedsslot2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Validation_Templateneedsslot2Inputs, {
    locale?: "en" | "id";
}, {}>;
