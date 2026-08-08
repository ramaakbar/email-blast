export { compose_datacoversallslots3 as "compose.dataCoversAllSlots" };
export type LocalizedString = import("../runtime.js").LocalizedString;
export type Compose_Datacoversallslots3Inputs = {
    count: NonNullable<unknown>;
};
/**
* | output |
* | --- |
* | "{count} recipients, data covers all slots" |
*
* @param {Compose_Datacoversallslots3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
declare const compose_datacoversallslots3: ((inputs: Compose_Datacoversallslots3Inputs, options?: {
    locale?: "en" | "id";
}) => LocalizedString) & import("../runtime.js").MessageMetadata<Compose_Datacoversallslots3Inputs, {
    locale?: "en" | "id";
}, {}>;
