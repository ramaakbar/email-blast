export { settingspage_storedlocally2 as "settingsPage.storedLocally" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Settingspage_Storedlocally2Inputs = {};
/**
* | output |
* | --- |
* | "Stored locally on this machine" |
*
* @param {Settingspage_Storedlocally2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const settingspage_storedlocally2: ((inputs?: Settingspage_Storedlocally2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Settingspage_Storedlocally2Inputs, {
    locale?: "en" | "id";
}, {}>;
