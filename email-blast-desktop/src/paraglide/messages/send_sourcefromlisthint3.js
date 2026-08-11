/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Send_Sourcefromlisthint3Inputs */

const en_send_sourcefromlisthint3 = /** @type {(inputs: Send_Sourcefromlisthint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A plain message with no attachments.`)
};

const id_send_sourcefromlisthint3 = /** @type {(inputs: Send_Sourcefromlisthint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pesan biasa tanpa lampiran.`)
};

/**
* | output |
* | --- |
* | "A plain message with no attachments." |
*
* @param {Send_Sourcefromlisthint3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const send_sourcefromlisthint3 = /** @type {((inputs?: Send_Sourcefromlisthint3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Send_Sourcefromlisthint3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_send_sourcefromlisthint3(inputs)
	return en_send_sourcefromlisthint3(inputs)
});
export { send_sourcefromlisthint3 as "send.sourceFromListHint" }