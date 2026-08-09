/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Messages_Addtitle1Inputs */

const en_messages_addtitle1 = /** @type {(inputs: Messages_Addtitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`New message template`)
};

const id_messages_addtitle1 = /** @type {(inputs: Messages_Addtitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Template pesan baru`)
};

/**
* | output |
* | --- |
* | "New message template" |
*
* @param {Messages_Addtitle1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const messages_addtitle1 = /** @type {((inputs?: Messages_Addtitle1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Messages_Addtitle1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_messages_addtitle1(inputs)
	return en_messages_addtitle1(inputs)
});
export { messages_addtitle1 as "messages.addTitle" }