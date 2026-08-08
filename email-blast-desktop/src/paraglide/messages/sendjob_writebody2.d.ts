export { sendjob_writebody2 as "sendJob.writeBody" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Sendjob_Writebody2Inputs = {};
/**
* | output |
* | --- |
* | "Write an email body." |
*
* @param {Sendjob_Writebody2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const sendjob_writebody2: ((inputs?: Sendjob_Writebody2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Sendjob_Writebody2Inputs, {
    locale?: "en" | "id";
}, {}>;
