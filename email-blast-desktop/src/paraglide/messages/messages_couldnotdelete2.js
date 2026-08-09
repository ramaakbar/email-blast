/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Messages_Couldnotdelete2Inputs */

const en_messages_couldnotdelete2 = /** @type {(inputs: Messages_Couldnotdelete2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not delete the message template.`)
};

const id_messages_couldnotdelete2 = /** @type {(inputs: Messages_Couldnotdelete2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gagal menghapus template pesan.`)
};

/**
* | output |
* | --- |
* | "Could not delete the message template." |
*
* @param {Messages_Couldnotdelete2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const messages_couldnotdelete2 = /** @type {((inputs?: Messages_Couldnotdelete2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Messages_Couldnotdelete2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_messages_couldnotdelete2(inputs)
	return en_messages_couldnotdelete2(inputs)
});
export { messages_couldnotdelete2 as "messages.couldNotDelete" }