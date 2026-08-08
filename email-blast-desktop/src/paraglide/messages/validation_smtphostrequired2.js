/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Validation_Smtphostrequired2Inputs */

const en_validation_smtphostrequired2 = /** @type {(inputs: Validation_Smtphostrequired2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SMTP host is required.`)
};

const id_validation_smtphostrequired2 = /** @type {(inputs: Validation_Smtphostrequired2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Host SMTP wajib diisi.`)
};

/**
* | output |
* | --- |
* | "SMTP host is required." |
*
* @param {Validation_Smtphostrequired2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const validation_smtphostrequired2 = /** @type {((inputs?: Validation_Smtphostrequired2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Validation_Smtphostrequired2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_validation_smtphostrequired2(inputs)
	return en_validation_smtphostrequired2(inputs)
});
export { validation_smtphostrequired2 as "validation.smtpHostRequired" }