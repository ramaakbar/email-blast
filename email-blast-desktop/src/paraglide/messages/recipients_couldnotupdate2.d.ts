export { recipients_couldnotupdate2 as "recipients.couldNotUpdate" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_Couldnotupdate2Inputs = {};
/**
* | output |
* | --- |
* | "Could not update the recipient." |
*
* @param {Recipients_Couldnotupdate2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_couldnotupdate2: ((inputs?: Recipients_Couldnotupdate2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_Couldnotupdate2Inputs, {
    locale?: "en" | "id";
}, {}>;
