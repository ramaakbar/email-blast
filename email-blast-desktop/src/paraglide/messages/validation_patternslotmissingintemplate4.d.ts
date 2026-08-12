export { validation_patternslotmissingintemplate4 as "validation.patternSlotMissingInTemplate" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Validation_Patternslotmissingintemplate4Inputs = {
    slot: NonNullable<unknown>;
    name: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "The output pattern references \"{slot}\", which template \"{name}\" does not declare." |
*
* @param {Validation_Patternslotmissingintemplate4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const validation_patternslotmissingintemplate4: ((inputs: Validation_Patternslotmissingintemplate4Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Validation_Patternslotmissingintemplate4Inputs, {
    locale?: "en" | "id";
}, {}>;
