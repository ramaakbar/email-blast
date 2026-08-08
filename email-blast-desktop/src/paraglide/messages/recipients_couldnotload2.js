/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Recipients_Couldnotload2Inputs */

const en_recipients_couldnotload2 = /** @type {(inputs: Recipients_Couldnotload2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not load recipients.`)
};

const id_recipients_couldnotload2 = /** @type {(inputs: Recipients_Couldnotload2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gagal memuat penerima.`)
};

/**
* | output |
* | --- |
* | "Could not load recipients." |
*
* @param {Recipients_Couldnotload2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_couldnotload2 = /** @type {((inputs?: Recipients_Couldnotload2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Couldnotload2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_recipients_couldnotload2(inputs)
	return en_recipients_couldnotload2(inputs)
});
export { recipients_couldnotload2 as "recipients.couldNotLoad" }