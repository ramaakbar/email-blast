export { compose_livepreviewhintone3 as "compose.livePreviewHintOne" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Livepreviewhintone3Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Rendered for the first {count} selected recipient - the message updates as you type." |
*
* @param {Compose_Livepreviewhintone3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_livepreviewhintone3: ((inputs: Compose_Livepreviewhintone3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Livepreviewhintone3Inputs, {
    locale?: "en" | "id";
}, {}>;
