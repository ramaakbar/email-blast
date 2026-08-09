/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Messages_SavedInputs */

const en_messages_saved = /** @type {(inputs: Messages_SavedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Message template saved.`)
};

const id_messages_saved = /** @type {(inputs: Messages_SavedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Template pesan disimpan.`)
};

/**
* | output |
* | --- |
* | "Message template saved." |
*
* @param {Messages_SavedInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const messages_saved = /** @type {((inputs?: Messages_SavedInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Messages_SavedInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_messages_saved(inputs)
	return en_messages_saved(inputs)
});
export { messages_saved as "messages.saved" }