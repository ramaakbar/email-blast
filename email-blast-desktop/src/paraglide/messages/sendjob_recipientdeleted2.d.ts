export { sendjob_recipientdeleted2 as "sendJob.recipientDeleted" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Sendjob_Recipientdeleted2Inputs = {};
/**
* | output |
* | --- |
* | "Recipient no longer exists in the database." |
*
* @param {Sendjob_Recipientdeleted2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const sendjob_recipientdeleted2: ((inputs?: Sendjob_Recipientdeleted2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Sendjob_Recipientdeleted2Inputs, {
    locale?: "en" | "id";
}, {}>;
