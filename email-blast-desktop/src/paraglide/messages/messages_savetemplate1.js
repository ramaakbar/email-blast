/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Messages_Savetemplate1Inputs */

const en_messages_savetemplate1 = /** @type {(inputs: Messages_Savetemplate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Save template`)
};

const id_messages_savetemplate1 = /** @type {(inputs: Messages_Savetemplate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Simpan template`)
};

/**
* | output |
* | --- |
* | "Save template" |
*
* @param {Messages_Savetemplate1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const messages_savetemplate1 = /** @type {((inputs?: Messages_Savetemplate1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Messages_Savetemplate1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_messages_savetemplate1(inputs)
	return en_messages_savetemplate1(inputs)
});
export { messages_savetemplate1 as "messages.saveTemplate" }