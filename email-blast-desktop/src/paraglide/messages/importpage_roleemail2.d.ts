export { importpage_roleemail2 as "importPage.roleEmail" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importpage_Roleemail2Inputs = {};
/**
* | output |
* | --- |
* | "Email" |
*
* @param {Importpage_Roleemail2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importpage_roleemail2: ((inputs?: Importpage_Roleemail2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importpage_Roleemail2Inputs, {
    locale?: "en" | "id";
}, {}>;
