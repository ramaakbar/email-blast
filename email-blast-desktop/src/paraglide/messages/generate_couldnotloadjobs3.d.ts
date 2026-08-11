export { generate_couldnotloadjobs3 as "generate.couldNotLoadJobs" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generate_Couldnotloadjobs3Inputs = {};
/**
* | output |
* | --- |
* | "Could not load past generate jobs." |
*
* @param {Generate_Couldnotloadjobs3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generate_couldnotloadjobs3: ((inputs?: Generate_Couldnotloadjobs3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generate_Couldnotloadjobs3Inputs, {
    locale?: "en" | "id";
}, {}>;
