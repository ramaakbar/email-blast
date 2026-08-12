export { fontsservice_couldnotread3 as "fontsService.couldNotRead" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Fontsservice_Couldnotread3Inputs = {
    path: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Could not read \"{path}\"." |
*
* @param {Fontsservice_Couldnotread3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const fontsservice_couldnotread3: ((inputs: Fontsservice_Couldnotread3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Fontsservice_Couldnotread3Inputs, {
    locale?: "en" | "id";
}, {}>;
