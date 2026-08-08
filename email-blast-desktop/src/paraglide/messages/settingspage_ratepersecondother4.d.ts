export { settingspage_ratepersecondother4 as "settingsPage.ratePerSecondOther" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Settingspage_Ratepersecondother4Inputs = {
    rate: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{rate} emails per second" |
*
* @param {Settingspage_Ratepersecondother4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const settingspage_ratepersecondother4: ((inputs: Settingspage_Ratepersecondother4Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Settingspage_Ratepersecondother4Inputs, {
    locale?: "en" | "id";
}, {}>;
