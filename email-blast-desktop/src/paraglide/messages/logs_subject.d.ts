export { logs_subject as "logs.subject" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Logs_SubjectInputs = {};
/**
* | output |
* | --- |
* | "Subject" |
*
* @param {Logs_SubjectInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const logs_subject: ((inputs?: Logs_SubjectInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Logs_SubjectInputs, {
    locale?: "en" | "id";
}, {}>;
