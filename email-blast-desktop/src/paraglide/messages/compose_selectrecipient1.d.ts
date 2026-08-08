export { compose_selectrecipient1 as "compose.selectRecipient" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Selectrecipient1Inputs = {
    name: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Select {name}" |
*
* @param {Compose_Selectrecipient1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_selectrecipient1: ((inputs: Compose_Selectrecipient1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Selectrecipient1Inputs, {
    locale?: "en" | "id";
}, {}>;
