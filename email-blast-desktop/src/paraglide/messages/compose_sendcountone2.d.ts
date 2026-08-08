export { compose_sendcountone2 as "compose.sendCountOne" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Sendcountone2Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Send {count} email" |
*
* @param {Compose_Sendcountone2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_sendcountone2: ((inputs: Compose_Sendcountone2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Sendcountone2Inputs, {
    locale?: "en" | "id";
}, {}>;
