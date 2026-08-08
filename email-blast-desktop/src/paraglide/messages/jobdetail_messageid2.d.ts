export { jobdetail_messageid2 as "jobDetail.messageId" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Jobdetail_Messageid2Inputs = {};
/**
* | output |
* | --- |
* | "Message ID" |
*
* @param {Jobdetail_Messageid2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const jobdetail_messageid2: ((inputs?: Jobdetail_Messageid2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Jobdetail_Messageid2Inputs, {
    locale?: "en" | "id";
}, {}>;
