export { recipients_couldnotdelete2 as "recipients.couldNotDelete" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_Couldnotdelete2Inputs = {};
/**
* | output |
* | --- |
* | "Could not delete the selected recipients." |
*
* @param {Recipients_Couldnotdelete2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_couldnotdelete2: ((inputs?: Recipients_Couldnotdelete2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_Couldnotdelete2Inputs, {
    locale?: "en" | "id";
}, {}>;
