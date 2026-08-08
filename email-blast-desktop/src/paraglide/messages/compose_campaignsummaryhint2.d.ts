export { compose_campaignsummaryhint2 as "compose.campaignSummaryHint" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Campaignsummaryhint2Inputs = {};
/**
* | output |
* | --- |
* | "One PDF per recipient, named by the template's output pattern. Failures are reported per recipient while the rest of the batch continues." |
*
* @param {Compose_Campaignsummaryhint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_campaignsummaryhint2: ((inputs?: Compose_Campaignsummaryhint2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Campaignsummaryhint2Inputs, {
    locale?: "en" | "id";
}, {}>;
