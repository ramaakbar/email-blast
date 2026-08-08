export { templates_deletetitle1 as "templates.deleteTitle" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Deletetitle1Inputs = {
    name: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Delete \"{name}\"?" |
*
* @param {Templates_Deletetitle1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_deletetitle1: ((inputs: Templates_Deletetitle1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Deletetitle1Inputs, {
    locale?: "en" | "id";
}, {}>;
