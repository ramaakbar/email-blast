export { compose_subject as "compose.subject" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_SubjectInputs = {};
/**
* | output |
* | --- |
* | "Subject" |
*
* @param {Compose_SubjectInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_subject: ((inputs?: Compose_SubjectInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_SubjectInputs, {
    locale?: "en" | "id";
}, {}>;
