export { settingspage_ratepersecondone4 as "settingsPage.ratePerSecondOne" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Settingspage_Ratepersecondone4Inputs = {
    rate: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{rate} email per second" |
*
* @param {Settingspage_Ratepersecondone4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const settingspage_ratepersecondone4: ((inputs: Settingspage_Ratepersecondone4Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Settingspage_Ratepersecondone4Inputs, {
    locale?: "en" | "id";
}, {}>;
