export { send_couldnotloadjob3 as "send.couldNotLoadJob" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Send_Couldnotloadjob3Inputs = {};
/**
* | output |
* | --- |
* | "Could not load the generate job." |
*
* @param {Send_Couldnotloadjob3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const send_couldnotloadjob3: ((inputs?: Send_Couldnotloadjob3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Send_Couldnotloadjob3Inputs, {
    locale?: "en" | "id";
}, {}>;
