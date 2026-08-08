export { compose_writebodytocontinue3 as "compose.writeBodyToContinue" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Writebodytocontinue3Inputs = {};
/**
* | output |
* | --- |
* | "Write an email body to continue" |
*
* @param {Compose_Writebodytocontinue3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_writebodytocontinue3: ((inputs?: Compose_Writebodytocontinue3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Writebodytocontinue3Inputs, {
    locale?: "en" | "id";
}, {}>;
