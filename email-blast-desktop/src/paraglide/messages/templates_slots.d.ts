export { templates_slots as "templates.slots" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_SlotsInputs = {};
/**
* | output |
* | --- |
* | "Slots" |
*
* @param {Templates_SlotsInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_slots: ((inputs?: Templates_SlotsInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_SlotsInputs, {
    locale?: "en" | "id";
}, {}>;
