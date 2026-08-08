/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Validation_Smtpportinvalid2Inputs */

const en_validation_smtpportinvalid2 = /** @type {(inputs: Validation_Smtpportinvalid2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Port must be a whole number between 1 and 65535.`)
};

const id_validation_smtpportinvalid2 = /** @type {(inputs: Validation_Smtpportinvalid2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Port harus bilangan bulat antara 1 dan 65535.`)
};

/**
* | output |
* | --- |
* | "Port must be a whole number between 1 and 65535." |
*
* @param {Validation_Smtpportinvalid2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const validation_smtpportinvalid2 = /** @type {((inputs?: Validation_Smtpportinvalid2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Validation_Smtpportinvalid2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_validation_smtpportinvalid2(inputs)
	return en_validation_smtpportinvalid2(inputs)
});
export { validation_smtpportinvalid2 as "validation.smtpPortInvalid" }