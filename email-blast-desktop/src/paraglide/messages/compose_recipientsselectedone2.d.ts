export { compose_recipientsselectedone2 as "compose.recipientsSelectedOne" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Recipientsselectedone2Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{count} recipient selected" |
*
* @param {Compose_Recipientsselectedone2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_recipientsselectedone2: ((inputs: Compose_Recipientsselectedone2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Recipientsselectedone2Inputs, {
    locale?: "en" | "id";
}, {}>;
