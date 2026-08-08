export { templates_countregisteredother2 as "templates.countRegisteredOther" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templates_Countregisteredother2Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{count} templates registered" |
*
* @param {Templates_Countregisteredother2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templates_countregisteredother2: ((inputs: Templates_Countregisteredother2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templates_Countregisteredother2Inputs, {
    locale?: "en" | "id";
}, {}>;
