export { compose_settingslink1 as "compose.settingsLink" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Settingslink1Inputs = {};
/**
* | output |
* | --- |
* | "Settings" |
*
* @param {Compose_Settingslink1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_settingslink1: ((inputs?: Compose_Settingslink1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Settingslink1Inputs, {
    locale?: "en" | "id";
}, {}>;
