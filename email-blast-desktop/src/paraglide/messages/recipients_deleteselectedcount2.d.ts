export { recipients_deleteselectedcount2 as "recipients.deleteSelectedCount" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_Deleteselectedcount2Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Delete selected ({count})" |
*
* @param {Recipients_Deleteselectedcount2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_deleteselectedcount2: ((inputs: Recipients_Deleteselectedcount2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_Deleteselectedcount2Inputs, {
    locale?: "en" | "id";
}, {}>;
