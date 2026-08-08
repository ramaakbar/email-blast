export { recipients_clearfilters1 as "recipients.clearFilters" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_Clearfilters1Inputs = {};
/**
* | output |
* | --- |
* | "Clear filters" |
*
* @param {Recipients_Clearfilters1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_clearfilters1: ((inputs?: Recipients_Clearfilters1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_Clearfilters1Inputs, {
    locale?: "en" | "id";
}, {}>;
