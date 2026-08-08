export { compose_cancelsendconfirm2 as "compose.cancelSendConfirm" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Cancelsendconfirm2Inputs = {
    current: NonNullable<unknown>;
    total: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{current} of {total} sent - cancel anyway?" |
*
* @param {Compose_Cancelsendconfirm2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_cancelsendconfirm2: ((inputs: Compose_Cancelsendconfirm2Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Cancelsendconfirm2Inputs, {
    locale?: "en" | "id";
}, {}>;
