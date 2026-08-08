export { templatesservice_couldnotread3 as "templatesService.couldNotRead" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Templatesservice_Couldnotread3Inputs = {
    path: NonNullable<unknown>;
    detail: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Could not read \"{path}\": {detail}" |
*
* @param {Templatesservice_Couldnotread3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const templatesservice_couldnotread3: ((inputs: Templatesservice_Couldnotread3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Templatesservice_Couldnotread3Inputs, {
    locale?: "en" | "id";
}, {}>;
