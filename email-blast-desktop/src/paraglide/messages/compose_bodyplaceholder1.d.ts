export { compose_bodyplaceholder1 as "compose.bodyPlaceholder" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Bodyplaceholder1Inputs = {
    name: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "<p>Dear {name},</p> <p>Congratulations on your scholarship.</p>" |
*
* @param {Compose_Bodyplaceholder1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_bodyplaceholder1: ((inputs: Compose_Bodyplaceholder1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Bodyplaceholder1Inputs, {
    locale?: "en" | "id";
}, {}>;
