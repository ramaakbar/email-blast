export { messages_edittitle1 as "messages.editTitle" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Messages_Edittitle1Inputs = {
    name: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Edit {name}" |
*
* @param {Messages_Edittitle1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const messages_edittitle1: ((inputs: Messages_Edittitle1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Messages_Edittitle1Inputs, {
    locale?: "en" | "id";
}, {}>;
