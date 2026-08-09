export { validation_slotlayoutinvalid2 as "validation.slotLayoutInvalid" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Validation_Slotlayoutinvalid2Inputs = {
    slot: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Slot \"{slot}\" has an invalid text position configuration." |
*
* @param {Validation_Slotlayoutinvalid2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const validation_slotlayoutinvalid2: ((inputs: Validation_Slotlayoutinvalid2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Validation_Slotlayoutinvalid2Inputs, {
    locale?: "en" | "id";
}, {}>;
