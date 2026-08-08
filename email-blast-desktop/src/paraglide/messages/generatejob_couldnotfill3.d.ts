export { generatejob_couldnotfill3 as "generateJob.couldNotFill" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Generatejob_Couldnotfill3Inputs = {
    message: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Could not fill the letter: {message}" |
*
* @param {Generatejob_Couldnotfill3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const generatejob_couldnotfill3: ((inputs: Generatejob_Couldnotfill3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Generatejob_Couldnotfill3Inputs, {
    locale?: "en" | "id";
}, {}>;
