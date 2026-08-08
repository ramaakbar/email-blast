export { compose_connectiondetailsready2 as "compose.connectionDetailsReady" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Connectiondetailsready2Inputs = {};
/**
* | output |
* | --- |
* | "Connection details ready" |
*
* @param {Compose_Connectiondetailsready2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_connectiondetailsready2: ((inputs?: Compose_Connectiondetailsready2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Connectiondetailsready2Inputs, {
    locale?: "en" | "id";
}, {}>;
