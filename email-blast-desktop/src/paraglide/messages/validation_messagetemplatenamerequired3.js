/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Validation_Messagetemplatenamerequired3Inputs */

const en_validation_messagetemplatenamerequired3 = /** @type {(inputs: Validation_Messagetemplatenamerequired3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Message template name is required.`)
};

const id_validation_messagetemplatenamerequired3 = /** @type {(inputs: Validation_Messagetemplatenamerequired3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nama template pesan wajib diisi.`)
};

/**
* | output |
* | --- |
* | "Message template name is required." |
*
* @param {Validation_Messagetemplatenamerequired3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const validation_messagetemplatenamerequired3 = /** @type {((inputs?: Validation_Messagetemplatenamerequired3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Validation_Messagetemplatenamerequired3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_validation_messagetemplatenamerequired3(inputs)
	return en_validation_messagetemplatenamerequired3(inputs)
});
export { validation_messagetemplatenamerequired3 as "validation.messageTemplateNameRequired" }