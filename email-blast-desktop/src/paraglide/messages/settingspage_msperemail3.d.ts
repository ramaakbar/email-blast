export { settingspage_msperemail3 as "settingsPage.msPerEmail" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Settingspage_Msperemail3Inputs = {
    ms: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{ms} ms per email" |
*
* @param {Settingspage_Msperemail3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const settingspage_msperemail3: ((inputs: Settingspage_Msperemail3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Settingspage_Msperemail3Inputs, {
    locale?: "en" | "id";
}, {}>;
