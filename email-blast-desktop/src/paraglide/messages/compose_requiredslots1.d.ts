export { compose_requiredslots1 as "compose.requiredSlots" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Requiredslots1Inputs = {};
/**
* | output |
* | --- |
* | "Required slots" |
*
* @param {Compose_Requiredslots1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_requiredslots1: ((inputs?: Compose_Requiredslots1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Requiredslots1Inputs, {
    locale?: "en" | "id";
}, {}>;
