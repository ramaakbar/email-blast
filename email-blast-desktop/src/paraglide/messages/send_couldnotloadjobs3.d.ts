export { send_couldnotloadjobs3 as "send.couldNotLoadJobs" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Send_Couldnotloadjobs3Inputs = {};
/**
* | output |
* | --- |
* | "Could not load past generate jobs." |
*
* @param {Send_Couldnotloadjobs3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const send_couldnotloadjobs3: ((inputs?: Send_Couldnotloadjobs3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Send_Couldnotloadjobs3Inputs, {
    locale?: "en" | "id";
}, {}>;
