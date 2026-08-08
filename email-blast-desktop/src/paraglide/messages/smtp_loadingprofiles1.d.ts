export { smtp_loadingprofiles1 as "smtp.loadingProfiles" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Smtp_Loadingprofiles1Inputs = {};
/**
* | output |
* | --- |
* | "Loading profiles…" |
*
* @param {Smtp_Loadingprofiles1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const smtp_loadingprofiles1: ((inputs?: Smtp_Loadingprofiles1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Smtp_Loadingprofiles1Inputs, {
    locale?: "en" | "id";
}, {}>;
