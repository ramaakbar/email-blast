/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Recipients_Nocustomfields2Inputs */

const en_recipients_nocustomfields2 = /** @type {(inputs: Recipients_Nocustomfields2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No custom fields.`)
};

const id_recipients_nocustomfields2 = /** @type {(inputs: Recipients_Nocustomfields2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tidak ada bidang kustom.`)
};

/**
* | output |
* | --- |
* | "No custom fields." |
*
* @param {Recipients_Nocustomfields2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_nocustomfields2 = /** @type {((inputs?: Recipients_Nocustomfields2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Nocustomfields2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_recipients_nocustomfields2(inputs)
	return en_recipients_nocustomfields2(inputs)
});
export { recipients_nocustomfields2 as "recipients.noCustomFields" }