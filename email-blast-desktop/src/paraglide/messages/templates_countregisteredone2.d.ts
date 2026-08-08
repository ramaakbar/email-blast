export { templates_countregisteredone2 as "templates.countRegisteredOne" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Countregisteredone2Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{count} template registered" |
*
* @param {Templates_Countregisteredone2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_countregisteredone2: ((inputs: Templates_Countregisteredone2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Countregisteredone2Inputs, {
    locale?: "en" | "id";
}, {}>;
