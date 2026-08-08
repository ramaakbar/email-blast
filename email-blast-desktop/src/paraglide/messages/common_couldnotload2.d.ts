export { common_couldnotload2 as "common.couldNotLoad" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Common_Couldnotload2Inputs = {
    key: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Could not load {key}." |
*
* @param {Common_Couldnotload2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const common_couldnotload2: ((inputs: Common_Couldnotload2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Common_Couldnotload2Inputs, {
    locale?: "en" | "id";
}, {}>;
