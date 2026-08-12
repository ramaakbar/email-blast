/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Recipients_Namerequired1Inputs */

const en_recipients_namerequired1 = /** @type {(inputs: Recipients_Namerequired1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Name is required.`)
};

const id_recipients_namerequired1 = /** @type {(inputs: Recipients_Namerequired1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nama wajib diisi.`)
};

/**
* | output |
* | --- |
* | "Name is required." |
*
* @param {Recipients_Namerequired1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_namerequired1 = /** @type {((inputs?: Recipients_Namerequired1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Namerequired1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_recipients_namerequired1(inputs)
	return en_recipients_namerequired1(inputs)
});
export { recipients_namerequired1 as "recipients.nameRequired" }