/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Messages_Messagestab1Inputs */

const en_messages_messagestab1 = /** @type {(inputs: Messages_Messagestab1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Messages`)
};

const id_messages_messagestab1 = /** @type {(inputs: Messages_Messagestab1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pesan`)
};

/**
* | output |
* | --- |
* | "Messages" |
*
* @param {Messages_Messagestab1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const messages_messagestab1 = /** @type {((inputs?: Messages_Messagestab1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Messages_Messagestab1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_messages_messagestab1(inputs)
	return en_messages_messagestab1(inputs)
});
export { messages_messagestab1 as "messages.messagesTab" }