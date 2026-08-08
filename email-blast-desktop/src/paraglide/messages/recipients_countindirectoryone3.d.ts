export { recipients_countindirectoryone3 as "recipients.countInDirectoryOne" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_Countindirectoryone3Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{count} recipient in the directory" |
*
* @param {Recipients_Countindirectoryone3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_countindirectoryone3: ((inputs: Recipients_Countindirectoryone3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_Countindirectoryone3Inputs, {
    locale?: "en" | "id";
}, {}>;
