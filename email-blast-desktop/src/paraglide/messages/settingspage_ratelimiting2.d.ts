export { settingspage_ratelimiting2 as "settingsPage.rateLimiting" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Settingspage_Ratelimiting2Inputs = {};
/**
* | output |
* | --- |
* | "Rate limiting" |
*
* @param {Settingspage_Ratelimiting2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const settingspage_ratelimiting2: ((inputs?: Settingspage_Ratelimiting2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Settingspage_Ratelimiting2Inputs, {
    locale?: "en" | "id";
}, {}>;
