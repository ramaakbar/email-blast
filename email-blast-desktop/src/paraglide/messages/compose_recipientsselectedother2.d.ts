export { compose_recipientsselectedother2 as "compose.recipientsSelectedOther" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Recipientsselectedother2Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{count} recipients selected" |
*
* @param {Compose_Recipientsselectedother2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_recipientsselectedother2: ((inputs: Compose_Recipientsselectedother2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Recipientsselectedother2Inputs, {
    locale?: "en" | "id";
}, {}>;
