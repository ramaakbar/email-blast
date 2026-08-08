export { importpage_columnrolearia3 as "importPage.columnRoleAria" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Importpage_Columnrolearia3Inputs = {
    column: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Role of the \"{column}\" column" |
*
* @param {Importpage_Columnrolearia3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const importpage_columnrolearia3: ((inputs: Importpage_Columnrolearia3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Importpage_Columnrolearia3Inputs, {
    locale?: "en" | "id";
}, {}>;
