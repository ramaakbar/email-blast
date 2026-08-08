export { templates_scanning as "templates.scanning" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_ScanningInputs = {};
/**
* | output |
* | --- |
* | "Scanning…" |
*
* @param {Templates_ScanningInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_scanning: ((inputs?: Templates_ScanningInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_ScanningInputs, {
    locale?: "en" | "id";
}, {}>;
