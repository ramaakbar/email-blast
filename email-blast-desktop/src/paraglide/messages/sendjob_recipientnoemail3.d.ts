export { sendjob_recipientnoemail3 as "sendJob.recipientNoEmail" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Sendjob_Recipientnoemail3Inputs = {};
/**
* | output |
* | --- |
* | "This recipient has no email address." |
*
* @param {Sendjob_Recipientnoemail3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const sendjob_recipientnoemail3: ((inputs?: Sendjob_Recipientnoemail3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Sendjob_Recipientnoemail3Inputs, {
    locale?: "en" | "id";
}, {}>;
