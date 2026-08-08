export { sendjob_noconfirmedattachments3 as "sendJob.noConfirmedAttachments" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Sendjob_Noconfirmedattachments3Inputs = {};
/**
* | output |
* | --- |
* | "None of the recipients has a confirmed generated attachment. Generate the PDFs first." |
*
* @param {Sendjob_Noconfirmedattachments3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const sendjob_noconfirmedattachments3: ((inputs?: Sendjob_Noconfirmedattachments3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Sendjob_Noconfirmedattachments3Inputs, {
    locale?: "en" | "id";
}, {}>;
