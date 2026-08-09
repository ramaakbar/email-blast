/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Messages_Nobodyyet2Inputs */

const en_messages_nobodyyet2 = /** @type {(inputs: Messages_Nobodyyet2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This template has an empty body.`)
};

const id_messages_nobodyyet2 = /** @type {(inputs: Messages_Nobodyyet2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Template ini memiliki isi kosong.`)
};

/**
* | output |
* | --- |
* | "This template has an empty body." |
*
* @param {Messages_Nobodyyet2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const messages_nobodyyet2 = /** @type {((inputs?: Messages_Nobodyyet2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Messages_Nobodyyet2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_messages_nobodyyet2(inputs)
	return en_messages_nobodyyet2(inputs)
});
export { messages_nobodyyet2 as "messages.noBodyYet" }