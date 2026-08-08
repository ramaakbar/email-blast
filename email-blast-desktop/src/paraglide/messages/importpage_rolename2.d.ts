export { importpage_rolename2 as "importPage.roleName" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importpage_Rolename2Inputs = {};
/**
* | output |
* | --- |
* | "Name" |
*
* @param {Importpage_Rolename2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importpage_rolename2: ((inputs?: Importpage_Rolename2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importpage_Rolename2Inputs, {
    locale?: "en" | "id";
}, {}>;
