/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Messages_Saveastitle2Inputs */

const en_messages_saveastitle2 = /** @type {(inputs: Messages_Saveastitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Save message as template`)
};

const id_messages_saveastitle2 = /** @type {(inputs: Messages_Saveastitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Simpan pesan sebagai template`)
};

/**
* | output |
* | --- |
* | "Save message as template" |
*
* @param {Messages_Saveastitle2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const messages_saveastitle2 = /** @type {((inputs?: Messages_Saveastitle2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Messages_Saveastitle2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_messages_saveastitle2(inputs)
	return en_messages_saveastitle2(inputs)
});
export { messages_saveastitle2 as "messages.saveAsTitle" }