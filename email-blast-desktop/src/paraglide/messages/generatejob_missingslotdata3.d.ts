export { generatejob_missingslotdata3 as "generateJob.missingSlotData" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generatejob_Missingslotdata3Inputs = {
    slot: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Missing data for slot \"{slot}\"." |
*
* @param {Generatejob_Missingslotdata3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generatejob_missingslotdata3: ((inputs: Generatejob_Missingslotdata3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generatejob_Missingslotdata3Inputs, {
    locale?: "en" | "id";
}, {}>;
