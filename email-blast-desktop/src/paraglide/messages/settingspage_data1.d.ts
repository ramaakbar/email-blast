export { settingspage_data1 as "settingsPage.data" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Settingspage_Data1Inputs = {};
/**
* | output |
* | --- |
* | "Data" |
*
* @param {Settingspage_Data1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const settingspage_data1: ((inputs?: Settingspage_Data1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Settingspage_Data1Inputs, {
    locale?: "en" | "id";
}, {}>;
