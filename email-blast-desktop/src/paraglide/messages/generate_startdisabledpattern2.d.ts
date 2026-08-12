export { generate_startdisabledpattern2 as "generate.startDisabledPattern" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generate_Startdisabledpattern2Inputs = {};
/**
* | output |
* | --- |
* | "Fix the output pattern - it references a slot that one of the templates does not declare." |
*
* @param {Generate_Startdisabledpattern2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generate_startdisabledpattern2: ((inputs?: Generate_Startdisabledpattern2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generate_Startdisabledpattern2Inputs, {
    locale?: "en" | "id";
}, {}>;
