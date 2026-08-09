/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Messages_Addmessagetemplate2Inputs */

const en_messages_addmessagetemplate2 = /** @type {(inputs: Messages_Addmessagetemplate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Add message template`)
};

const id_messages_addmessagetemplate2 = /** @type {(inputs: Messages_Addmessagetemplate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tambah template pesan`)
};

/**
* | output |
* | --- |
* | "Add message template" |
*
* @param {Messages_Addmessagetemplate2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const messages_addmessagetemplate2 = /** @type {((inputs?: Messages_Addmessagetemplate2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Messages_Addmessagetemplate2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_messages_addmessagetemplate2(inputs)
	return en_messages_addmessagetemplate2(inputs)
});
export { messages_addmessagetemplate2 as "messages.addMessageTemplate" }