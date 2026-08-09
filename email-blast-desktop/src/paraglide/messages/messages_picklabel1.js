/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Messages_Picklabel1Inputs */

const en_messages_picklabel1 = /** @type {(inputs: Messages_Picklabel1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Message template`)
};

const id_messages_picklabel1 = /** @type {(inputs: Messages_Picklabel1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Template pesan`)
};

/**
* | output |
* | --- |
* | "Message template" |
*
* @param {Messages_Picklabel1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const messages_picklabel1 = /** @type {((inputs?: Messages_Picklabel1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Messages_Picklabel1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_messages_picklabel1(inputs)
	return en_messages_picklabel1(inputs)
});
export { messages_picklabel1 as "messages.pickLabel" }