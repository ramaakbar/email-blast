/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Messages_Saveas1Inputs */

const en_messages_saveas1 = /** @type {(inputs: Messages_Saveas1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Save as template`)
};

const id_messages_saveas1 = /** @type {(inputs: Messages_Saveas1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Simpan sebagai template`)
};

/**
* | output |
* | --- |
* | "Save as template" |
*
* @param {Messages_Saveas1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const messages_saveas1 = /** @type {((inputs?: Messages_Saveas1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Messages_Saveas1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_messages_saveas1(inputs)
	return en_messages_saveas1(inputs)
});
export { messages_saveas1 as "messages.saveAs" }