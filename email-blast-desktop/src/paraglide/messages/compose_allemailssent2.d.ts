export { compose_allemailssent2 as "compose.allEmailsSent" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Allemailssent2Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "All {count} emails sent." |
*
* @param {Compose_Allemailssent2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_allemailssent2: ((inputs: Compose_Allemailssent2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Allemailssent2Inputs, {
    locale?: "en" | "id";
}, {}>;
