/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Validation_Smtppasswordrequired2Inputs */

const en_validation_smtppasswordrequired2 = /** @type {(inputs: Validation_Smtppasswordrequired2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`App password is required.`)
};

const id_validation_smtppasswordrequired2 = /** @type {(inputs: Validation_Smtppasswordrequired2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Kata sandi aplikasi wajib diisi.`)
};

/**
* | output |
* | --- |
* | "App password is required." |
*
* @param {Validation_Smtppasswordrequired2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const validation_smtppasswordrequired2 = /** @type {((inputs?: Validation_Smtppasswordrequired2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Validation_Smtppasswordrequired2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_validation_smtppasswordrequired2(inputs)
	return en_validation_smtppasswordrequired2(inputs)
});
export { validation_smtppasswordrequired2 as "validation.smtpPasswordRequired" }