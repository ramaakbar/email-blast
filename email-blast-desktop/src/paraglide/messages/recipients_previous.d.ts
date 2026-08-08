export { recipients_previous as "recipients.previous" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_PreviousInputs = {};
/**
* | output |
* | --- |
* | "Previous" |
*
* @param {Recipients_PreviousInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_previous: ((inputs?: Recipients_PreviousInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_PreviousInputs, {
    locale?: "en" | "id";
}, {}>;
