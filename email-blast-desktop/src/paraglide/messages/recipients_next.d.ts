export { recipients_next as "recipients.next" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_NextInputs = {};
/**
* | output |
* | --- |
* | "Next" |
*
* @param {Recipients_NextInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_next: ((inputs?: Recipients_NextInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_NextInputs, {
    locale?: "en" | "id";
}, {}>;
