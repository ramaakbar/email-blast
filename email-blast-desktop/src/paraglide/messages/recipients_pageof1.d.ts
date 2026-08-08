export { recipients_pageof1 as "recipients.pageOf" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_Pageof1Inputs = {
    page: NonNullable<unknown>;
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Page {page} of {count}" |
*
* @param {Recipients_Pageof1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_pageof1: ((inputs: Recipients_Pageof1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_Pageof1Inputs, {
    locale?: "en" | "id";
}, {}>;
