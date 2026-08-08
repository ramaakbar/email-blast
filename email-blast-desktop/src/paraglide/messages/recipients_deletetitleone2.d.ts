export { recipients_deletetitleone2 as "recipients.deleteTitleOne" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_Deletetitleone2Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Delete {count} recipient?" |
*
* @param {Recipients_Deletetitleone2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_deletetitleone2: ((inputs: Recipients_Deletetitleone2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_Deletetitleone2Inputs, {
    locale?: "en" | "id";
}, {}>;
