export { compose_generatedfailedfooter2 as "compose.generatedFailedFooter" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Generatedfailedfooter2Inputs = {
    generated: NonNullable<unknown>;
    failed: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{generated} generated, {failed} failed" |
*
* @param {Compose_Generatedfailedfooter2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_generatedfailedfooter2: ((inputs: Compose_Generatedfailedfooter2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Generatedfailedfooter2Inputs, {
    locale?: "en" | "id";
}, {}>;
