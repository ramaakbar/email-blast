export { compose_campaignsummary1 as "compose.campaignSummary" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Campaignsummary1Inputs = {};
/**
* | output |
* | --- |
* | "Campaign summary" |
*
* @param {Compose_Campaignsummary1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_campaignsummary1: ((inputs?: Compose_Campaignsummary1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Campaignsummary1Inputs, {
    locale?: "en" | "id";
}, {}>;
