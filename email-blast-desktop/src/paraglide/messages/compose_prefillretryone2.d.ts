export { compose_prefillretryone2 as "compose.prefillRetryOne" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Prefillretryone2Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Retry pre-filled from Logs: {count} failed recipient, the same template, message, and SMTP." |
*
* @param {Compose_Prefillretryone2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_prefillretryone2: ((inputs: Compose_Prefillretryone2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Prefillretryone2Inputs, {
    locale?: "en" | "id";
}, {}>;
