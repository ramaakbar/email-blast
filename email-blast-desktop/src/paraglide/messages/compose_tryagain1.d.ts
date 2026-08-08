export { compose_tryagain1 as "compose.tryAgain" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Tryagain1Inputs = {};
/**
* | output |
* | --- |
* | "Try again" |
*
* @param {Compose_Tryagain1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_tryagain1: ((inputs?: Compose_Tryagain1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Tryagain1Inputs, {
    locale?: "en" | "id";
}, {}>;
