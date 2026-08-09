/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Messages_Couldnotsave2Inputs */

const en_messages_couldnotsave2 = /** @type {(inputs: Messages_Couldnotsave2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not save the message template.`)
};

const id_messages_couldnotsave2 = /** @type {(inputs: Messages_Couldnotsave2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gagal menyimpan template pesan.`)
};

/**
* | output |
* | --- |
* | "Could not save the message template." |
*
* @param {Messages_Couldnotsave2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const messages_couldnotsave2 = /** @type {((inputs?: Messages_Couldnotsave2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Messages_Couldnotsave2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_messages_couldnotsave2(inputs)
	return en_messages_couldnotsave2(inputs)
});
export { messages_couldnotsave2 as "messages.couldNotSave" }