export { compose_subjectplaceholder1 as "compose.subjectPlaceholder" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Subjectplaceholder1Inputs = {
    name: NonNullable<unknown>;
    instansi: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "LOA for {name} - {instansi}" |
*
* @param {Compose_Subjectplaceholder1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_subjectplaceholder1: ((inputs: Compose_Subjectplaceholder1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Subjectplaceholder1Inputs, {
    locale?: "en" | "id";
}, {}>;
