export { compose_pageof1 as "compose.pageOf" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Pageof1Inputs = {
    page: NonNullable<unknown>;
    total: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Page {page} of {total}" |
*
* @param {Compose_Pageof1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_pageof1: ((inputs: Compose_Pageof1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Pageof1Inputs, {
    locale?: "en" | "id";
}, {}>;
