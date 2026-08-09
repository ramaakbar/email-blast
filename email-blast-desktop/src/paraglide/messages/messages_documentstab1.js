/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Messages_Documentstab1Inputs */

const en_messages_documentstab1 = /** @type {(inputs: Messages_Documentstab1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Documents`)
};

const id_messages_documentstab1 = /** @type {(inputs: Messages_Documentstab1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dokumen`)
};

/**
* | output |
* | --- |
* | "Documents" |
*
* @param {Messages_Documentstab1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const messages_documentstab1 = /** @type {((inputs?: Messages_Documentstab1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Messages_Documentstab1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_messages_documentstab1(inputs)
	return en_messages_documentstab1(inputs)
});
export { messages_documentstab1 as "messages.documentsTab" }