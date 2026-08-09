export { compose_senderdomainmismatch2 as "compose.senderDomainMismatch" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Senderdomainmismatch2Inputs = {
    provider: NonNullable<unknown>;
    domain: NonNullable<unknown>;
    from: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "The {provider} server only accepts From addresses in the {domain} domain - {from} will likely be rejected." |
*
* @param {Compose_Senderdomainmismatch2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_senderdomainmismatch2: ((inputs: Compose_Senderdomainmismatch2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Senderdomainmismatch2Inputs, {
    locale?: "en" | "id";
}, {}>;
