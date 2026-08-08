export { compose_failedrecipientstitle2 as "compose.failedRecipientsTitle" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Failedrecipientstitle2Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Failed recipients ({count})" |
*
* @param {Compose_Failedrecipientstitle2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_failedrecipientstitle2: ((inputs: Compose_Failedrecipientstitle2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Failedrecipientstitle2Inputs, {
    locale?: "en" | "id";
}, {}>;
