/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Validation_Smtpnamerequired2Inputs */

const en_validation_smtpnamerequired2 = /** @type {(inputs: Validation_Smtpnamerequired2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Profile name is required.`)
};

const id_validation_smtpnamerequired2 = /** @type {(inputs: Validation_Smtpnamerequired2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nama profil wajib diisi.`)
};

/**
* | output |
* | --- |
* | "Profile name is required." |
*
* @param {Validation_Smtpnamerequired2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const validation_smtpnamerequired2 = /** @type {((inputs?: Validation_Smtpnamerequired2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Validation_Smtpnamerequired2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_validation_smtpnamerequired2(inputs)
	return en_validation_smtpnamerequired2(inputs)
});
export { validation_smtpnamerequired2 as "validation.smtpNameRequired" }