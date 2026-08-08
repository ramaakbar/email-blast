export { compose_cancelleddetail1 as "compose.cancelledDetail" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Cancelleddetail1Inputs = {
    sent: NonNullable<unknown>;
    skipped: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{sent} sent, {skipped} skipped. No one was double-sent. To send to the skipped recipients, go back and start a new send from the same generated PDFs." |
*
* @param {Compose_Cancelleddetail1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_cancelleddetail1: ((inputs: Compose_Cancelleddetail1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Cancelleddetail1Inputs, {
    locale?: "en" | "id";
}, {}>;
