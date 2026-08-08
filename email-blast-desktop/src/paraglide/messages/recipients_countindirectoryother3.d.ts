export { recipients_countindirectoryother3 as "recipients.countInDirectoryOther" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_Countindirectoryother3Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{count} recipients in the directory" |
*
* @param {Recipients_Countindirectoryother3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_countindirectoryother3: ((inputs: Recipients_Countindirectoryother3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_Countindirectoryother3Inputs, {
    locale?: "en" | "id";
}, {}>;
