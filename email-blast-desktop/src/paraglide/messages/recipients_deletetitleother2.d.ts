export { recipients_deletetitleother2 as "recipients.deleteTitleOther" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_Deletetitleother2Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Delete {count} recipients?" |
*
* @param {Recipients_Deletetitleother2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_deletetitleother2: ((inputs: Recipients_Deletetitleother2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_Deletetitleother2Inputs, {
    locale?: "en" | "id";
}, {}>;
