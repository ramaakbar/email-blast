/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Messages_Notemplatesyet2Inputs */

const en_messages_notemplatesyet2 = /** @type {(inputs: Messages_Notemplatesyet2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No message templates yet`)
};

const id_messages_notemplatesyet2 = /** @type {(inputs: Messages_Notemplatesyet2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Belum ada template pesan`)
};

/**
* | output |
* | --- |
* | "No message templates yet" |
*
* @param {Messages_Notemplatesyet2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const messages_notemplatesyet2 = /** @type {((inputs?: Messages_Notemplatesyet2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Messages_Notemplatesyet2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_messages_notemplatesyet2(inputs)
	return en_messages_notemplatesyet2(inputs)
});
export { messages_notemplatesyet2 as "messages.noTemplatesYet" }