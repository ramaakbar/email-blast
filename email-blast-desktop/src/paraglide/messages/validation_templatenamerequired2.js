/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Validation_Templatenamerequired2Inputs */

const en_validation_templatenamerequired2 = /** @type {(inputs: Validation_Templatenamerequired2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Template name is required.`)
};

const id_validation_templatenamerequired2 = /** @type {(inputs: Validation_Templatenamerequired2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nama template wajib diisi.`)
};

/**
* | output |
* | --- |
* | "Template name is required." |
*
* @param {Validation_Templatenamerequired2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const validation_templatenamerequired2 = /** @type {((inputs?: Validation_Templatenamerequired2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Validation_Templatenamerequired2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_validation_templatenamerequired2(inputs)
	return en_validation_templatenamerequired2(inputs)
});
export { validation_templatenamerequired2 as "validation.templateNameRequired" }