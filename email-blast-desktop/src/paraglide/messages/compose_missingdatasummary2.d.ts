export { compose_missingdatasummary2 as "compose.missingDataSummary" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Missingdatasummary2Inputs = {
    missing: NonNullable<unknown>;
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{missing} of {count} selected recipients are missing data for:" |
*
* @param {Compose_Missingdatasummary2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_missingdatasummary2: ((inputs: Compose_Missingdatasummary2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Missingdatasummary2Inputs, {
    locale?: "en" | "id";
}, {}>;
