export { jobdetail_recipientdeletednoedit4 as "jobDetail.recipientDeletedNoEdit" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Jobdetail_Recipientdeletednoedit4Inputs = {};
/**
* | output |
* | --- |
* | "This recipient was deleted - the row is read-only." |
*
* @param {Jobdetail_Recipientdeletednoedit4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const jobdetail_recipientdeletednoedit4: ((inputs?: Jobdetail_Recipientdeletednoedit4Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Jobdetail_Recipientdeletednoedit4Inputs, {
    locale?: "en" | "id";
}, {}>;
