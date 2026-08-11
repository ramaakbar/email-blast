export { send_joboption1 as "send.jobOption" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Send_Joboption1Inputs = {
    template: NonNullable<unknown>;
    generated: NonNullable<unknown>;
    failed: NonNullable<unknown>;
    stamp: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{template} · {generated} generated · {failed} failed · {stamp}" |
*
* @param {Send_Joboption1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const send_joboption1: ((inputs: Send_Joboption1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Send_Joboption1Inputs, {
    locale?: "en" | "id";
}, {}>;
