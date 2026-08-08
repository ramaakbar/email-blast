export { templates_keepmyslots2 as "templates.keepMySlots" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Keepmyslots2Inputs = {};
/**
* | output |
* | --- |
* | "Keep my slots" |
*
* @param {Templates_Keepmyslots2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_keepmyslots2: ((inputs?: Templates_Keepmyslots2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Keepmyslots2Inputs, {
    locale?: "en" | "id";
}, {}>;
