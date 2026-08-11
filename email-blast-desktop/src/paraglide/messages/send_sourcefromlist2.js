/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Send_Sourcefromlist2Inputs */

const en_send_sourcefromlist2 = /** @type {(inputs: Send_Sourcefromlist2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`From the imported list`)
};

const id_send_sourcefromlist2 = /** @type {(inputs: Send_Sourcefromlist2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dari daftar impor`)
};

/**
* | output |
* | --- |
* | "From the imported list" |
*
* @param {Send_Sourcefromlist2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const send_sourcefromlist2 = /** @type {((inputs?: Send_Sourcefromlist2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Send_Sourcefromlist2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_send_sourcefromlist2(inputs)
	return en_send_sourcefromlist2(inputs)
});
export { send_sourcefromlist2 as "send.sourceFromList" }