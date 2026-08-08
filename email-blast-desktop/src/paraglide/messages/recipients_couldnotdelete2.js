/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Recipients_Couldnotdelete2Inputs */

const en_recipients_couldnotdelete2 = /** @type {(inputs: Recipients_Couldnotdelete2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not delete the selected recipients.`)
};

const id_recipients_couldnotdelete2 = /** @type {(inputs: Recipients_Couldnotdelete2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gagal menghapus penerima terpilih.`)
};

/**
* | output |
* | --- |
* | "Could not delete the selected recipients." |
*
* @param {Recipients_Couldnotdelete2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_couldnotdelete2 = /** @type {((inputs?: Recipients_Couldnotdelete2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Couldnotdelete2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_recipients_couldnotdelete2(inputs)
	return en_recipients_couldnotdelete2(inputs)
});
export { recipients_couldnotdelete2 as "recipients.couldNotDelete" }