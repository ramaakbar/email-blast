export { sendjob_attachmentsmissingondisk4 as "sendJob.attachmentsMissingOnDisk" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Sendjob_Attachmentsmissingondisk4Inputs = {};
/**
* | output |
* | --- |
* | "The generated attachment files no longer exist on disk. Generate the PDFs again." |
*
* @param {Sendjob_Attachmentsmissingondisk4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const sendjob_attachmentsmissingondisk4: ((inputs?: Sendjob_Attachmentsmissingondisk4Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Sendjob_Attachmentsmissingondisk4Inputs, {
    locale?: "en" | "id";
}, {}>;
