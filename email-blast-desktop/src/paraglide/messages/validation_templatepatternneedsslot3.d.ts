export { validation_templatepatternneedsslot3 as "validation.templatePatternNeedsSlot" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Validation_Templatepatternneedsslot3Inputs = {
    name: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "The output pattern must reference at least one slot, e.g. \"LOA_{name}.pdf\"." |
*
* @param {Validation_Templatepatternneedsslot3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const validation_templatepatternneedsslot3: ((inputs: Validation_Templatepatternneedsslot3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Validation_Templatepatternneedsslot3Inputs, {
    locale?: "en" | "id";
}, {}>;
