export { recipients_filterbybatch2 as "recipients.filterByBatch" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_Filterbybatch2Inputs = {};
/**
* | output |
* | --- |
* | "Filter by import batch" |
*
* @param {Recipients_Filterbybatch2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_filterbybatch2: ((inputs?: Recipients_Filterbybatch2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_Filterbybatch2Inputs, {
    locale?: "en" | "id";
}, {}>;
