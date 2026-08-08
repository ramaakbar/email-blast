export { sendjob_writesubject2 as "sendJob.writeSubject" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Sendjob_Writesubject2Inputs = {};
/**
* | output |
* | --- |
* | "Write a subject." |
*
* @param {Sendjob_Writesubject2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const sendjob_writesubject2: ((inputs?: Sendjob_Writesubject2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Sendjob_Writesubject2Inputs, {
    locale?: "en" | "id";
}, {}>;
