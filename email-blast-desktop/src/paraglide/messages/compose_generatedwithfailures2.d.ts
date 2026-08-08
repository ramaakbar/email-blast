export { compose_generatedwithfailures2 as "compose.generatedWithFailures" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Generatedwithfailures2Inputs = {
    generated: NonNullable<unknown>;
    failed: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{generated} generated, {failed} failed. Failed recipients are excluded from the send automatically." |
*
* @param {Compose_Generatedwithfailures2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_generatedwithfailures2: ((inputs: Compose_Generatedwithfailures2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Generatedwithfailures2Inputs, {
    locale?: "en" | "id";
}, {}>;
