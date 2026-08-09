/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Messages_Couldnotload2Inputs */

const en_messages_couldnotload2 = /** @type {(inputs: Messages_Couldnotload2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not load message templates.`)
};

const id_messages_couldnotload2 = /** @type {(inputs: Messages_Couldnotload2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gagal memuat template pesan.`)
};

/**
* | output |
* | --- |
* | "Could not load message templates." |
*
* @param {Messages_Couldnotload2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const messages_couldnotload2 = /** @type {((inputs?: Messages_Couldnotload2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Messages_Couldnotload2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_messages_couldnotload2(inputs)
	return en_messages_couldnotload2(inputs)
});
export { messages_couldnotload2 as "messages.couldNotLoad" }