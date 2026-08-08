export { sendjob_noattachmentforrecipient4 as "sendJob.noAttachmentForRecipient" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Sendjob_Noattachmentforrecipient4Inputs = {};
/**
* | output |
* | --- |
* | "No confirmed generated attachment for this recipient." |
*
* @param {Sendjob_Noattachmentforrecipient4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const sendjob_noattachmentforrecipient4: ((inputs?: Sendjob_Noattachmentforrecipient4Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Sendjob_Noattachmentforrecipient4Inputs, {
    locale?: "en" | "id";
}, {}>;
