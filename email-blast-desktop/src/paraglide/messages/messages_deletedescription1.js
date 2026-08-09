/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Messages_Deletedescription1Inputs */

const en_messages_deletedescription1 = /** @type {(inputs: Messages_Deletedescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Send Jobs keep their own copy of the message, so nothing you sent is changed. The template is removed from the library.`)
};

const id_messages_deletedescription1 = /** @type {(inputs: Messages_Deletedescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pekerjaan kirim menyimpan salinan pesannya sendiri, jadi tidak ada yang terkirim yang berubah. Template dihapus dari pustaka.`)
};

/**
* | output |
* | --- |
* | "Send Jobs keep their own copy of the message, so nothing you sent is changed. The template is removed from the library." |
*
* @param {Messages_Deletedescription1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const messages_deletedescription1 = /** @type {((inputs?: Messages_Deletedescription1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Messages_Deletedescription1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_messages_deletedescription1(inputs)
	return en_messages_deletedescription1(inputs)
});
export { messages_deletedescription1 as "messages.deleteDescription" }