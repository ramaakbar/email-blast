export { compose_prefillretryother2 as "compose.prefillRetryOther" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Prefillretryother2Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Retry pre-filled from Logs: {count} failed recipients, the same template, message, and SMTP." |
*
* @param {Compose_Prefillretryother2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_prefillretryother2: ((inputs: Compose_Prefillretryother2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Prefillretryother2Inputs, {
    locale?: "en" | "id";
}, {}>;
