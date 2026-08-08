export { compose_windingdowntitle2 as "compose.windingDownTitle" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Windingdowntitle2Inputs = {};
/**
* | output |
* | --- |
* | "The in-flight email is finishing - resume in a moment" |
*
* @param {Compose_Windingdowntitle2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_windingdowntitle2: ((inputs?: Compose_Windingdowntitle2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Windingdowntitle2Inputs, {
    locale?: "en" | "id";
}, {}>;
