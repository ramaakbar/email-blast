export { templates_edittitle1 as "templates.editTitle" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Edittitle1Inputs = {
    name: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Edit \"{name}\"" |
*
* @param {Templates_Edittitle1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_edittitle1: ((inputs: Templates_Edittitle1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Edittitle1Inputs, {
    locale?: "en" | "id";
}, {}>;
