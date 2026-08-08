export { compose_enterdetails1 as "compose.enterDetails" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Enterdetails1Inputs = {};
/**
* | output |
* | --- |
* | "Enter details (this job only)" |
*
* @param {Compose_Enterdetails1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_enterdetails1: ((inputs?: Compose_Enterdetails1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Enterdetails1Inputs, {
    locale?: "en" | "id";
}, {}>;
