export { compose_livepreviewhintother3 as "compose.livePreviewHintOther" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Livepreviewhintother3Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Rendered for the first {count} selected recipients - the message updates as you type." |
*
* @param {Compose_Livepreviewhintother3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_livepreviewhintother3: ((inputs: Compose_Livepreviewhintother3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Livepreviewhintother3Inputs, {
    locale?: "en" | "id";
}, {}>;
