/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Messages_NameInputs */

const en_messages_name = /** @type {(inputs: Messages_NameInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Template name`)
};

const id_messages_name = /** @type {(inputs: Messages_NameInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nama template`)
};

/**
* | output |
* | --- |
* | "Template name" |
*
* @param {Messages_NameInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const messages_name = /** @type {((inputs?: Messages_NameInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Messages_NameInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_messages_name(inputs)
	return en_messages_name(inputs)
});
export { messages_name as "messages.name" }