/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Validation_Smtpusernamerequired2Inputs */

const en_validation_smtpusernamerequired2 = /** @type {(inputs: Validation_Smtpusernamerequired2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Username is required.`)
};

const id_validation_smtpusernamerequired2 = /** @type {(inputs: Validation_Smtpusernamerequired2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nama pengguna wajib diisi.`)
};

/**
* | output |
* | --- |
* | "Username is required." |
*
* @param {Validation_Smtpusernamerequired2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const validation_smtpusernamerequired2 = /** @type {((inputs?: Validation_Smtpusernamerequired2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Validation_Smtpusernamerequired2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_validation_smtpusernamerequired2(inputs)
	return en_validation_smtpusernamerequired2(inputs)
});
export { validation_smtpusernamerequired2 as "validation.smtpUsernameRequired" }