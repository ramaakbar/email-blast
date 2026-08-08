export { compose_waitingfirstemail2 as "compose.waitingFirstEmail" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Waitingfirstemail2Inputs = {};
/**
* | output |
* | --- |
* | "Waiting for the first email…" |
*
* @param {Compose_Waitingfirstemail2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_waitingfirstemail2: ((inputs?: Compose_Waitingfirstemail2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Waitingfirstemail2Inputs, {
    locale?: "en" | "id";
}, {}>;
