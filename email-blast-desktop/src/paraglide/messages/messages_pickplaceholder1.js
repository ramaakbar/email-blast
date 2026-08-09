/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Messages_Pickplaceholder1Inputs */

const en_messages_pickplaceholder1 = /** @type {(inputs: Messages_Pickplaceholder1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Choose a message template to copy…`)
};

const id_messages_pickplaceholder1 = /** @type {(inputs: Messages_Pickplaceholder1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pilih template pesan untuk disalin…`)
};

/**
* | output |
* | --- |
* | "Choose a message template to copy…" |
*
* @param {Messages_Pickplaceholder1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const messages_pickplaceholder1 = /** @type {((inputs?: Messages_Pickplaceholder1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Messages_Pickplaceholder1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_messages_pickplaceholder1(inputs)
	return en_messages_pickplaceholder1(inputs)
});
export { messages_pickplaceholder1 as "messages.pickPlaceholder" }