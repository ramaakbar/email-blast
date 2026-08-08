export { recipients_showingrange1 as "recipients.showingRange" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Recipients_Showingrange1Inputs = {
    from: NonNullable<unknown>;
    to: NonNullable<unknown>;
    total: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "Showing {from}-{to} of {total}" |
*
* @param {Recipients_Showingrange1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const recipients_showingrange1: ((inputs: Recipients_Showingrange1Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Recipients_Showingrange1Inputs, {
    locale?: "en" | "id";
}, {}>;
