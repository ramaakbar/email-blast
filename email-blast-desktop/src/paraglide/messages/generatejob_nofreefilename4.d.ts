export { generatejob_nofreefilename4 as "generateJob.noFreeFileName" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generatejob_Nofreefilename4Inputs = {
    name: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Could not find a free file name for \"{name}\"." |
*
* @param {Generatejob_Nofreefilename4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generatejob_nofreefilename4: ((inputs: Generatejob_Nofreefilename4Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generatejob_Nofreefilename4Inputs, {
    locale?: "en" | "id";
}, {}>;
