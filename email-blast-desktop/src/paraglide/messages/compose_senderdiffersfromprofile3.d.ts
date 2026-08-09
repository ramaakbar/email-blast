export { compose_senderdiffersfromprofile3 as "compose.senderDiffersFromProfile" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Senderdiffersfromprofile3Inputs = {
    address: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "This From address differs from the profile's default ({address}). The server may reject it." |
*
* @param {Compose_Senderdiffersfromprofile3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_senderdiffersfromprofile3: ((inputs: Compose_Senderdiffersfromprofile3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Senderdiffersfromprofile3Inputs, {
    locale?: "en" | "id";
}, {}>;
