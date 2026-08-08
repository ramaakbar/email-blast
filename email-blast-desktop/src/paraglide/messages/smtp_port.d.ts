export { smtp_port as "smtp.port" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Smtp_PortInputs = {};
/**
* | output |
* | --- |
* | "Port" |
*
* @param {Smtp_PortInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const smtp_port: ((inputs?: Smtp_PortInputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Smtp_PortInputs, {
    locale?: "en" | "id";
}, {}>;
