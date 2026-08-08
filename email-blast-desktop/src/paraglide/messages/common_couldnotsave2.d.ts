export { common_couldnotsave2 as "common.couldNotSave" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Common_Couldnotsave2Inputs = {
    key: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Could not save {key}." |
*
* @param {Common_Couldnotsave2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const common_couldnotsave2: ((inputs: Common_Couldnotsave2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Common_Couldnotsave2Inputs, {
    locale?: "en" | "id";
}, {}>;
