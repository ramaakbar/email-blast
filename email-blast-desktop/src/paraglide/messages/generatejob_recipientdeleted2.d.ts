export { generatejob_recipientdeleted2 as "generateJob.recipientDeleted" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generatejob_Recipientdeleted2Inputs = {};
/**
* | output |
* | --- |
* | "Recipient no longer exists in the database." |
*
* @param {Generatejob_Recipientdeleted2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generatejob_recipientdeleted2: ((inputs?: Generatejob_Recipientdeleted2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generatejob_Recipientdeleted2Inputs, {
    locale?: "en" | "id";
}, {}>;
