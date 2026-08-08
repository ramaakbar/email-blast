export { compose_sendcountother2 as "compose.sendCountOther" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Sendcountother2Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Send {count} emails" |
*
* @param {Compose_Sendcountother2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_sendcountother2: ((inputs: Compose_Sendcountother2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Sendcountother2Inputs, {
    locale?: "en" | "id";
}, {}>;
