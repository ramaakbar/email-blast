export { compose_attachments as "compose.attachments" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_AttachmentsInputs = {};
/**
* | output |
* | --- |
* | "Attachments" |
*
* @param {Compose_AttachmentsInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_attachments: ((inputs?: Compose_AttachmentsInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_AttachmentsInputs, {
    locale?: "en" | "id";
}, {}>;
