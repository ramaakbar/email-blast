/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Generate_DescriptionInputs */

const en_generate_description = /** @type {(inputs: Generate_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generate documents for the selected recipients - no email configuration needed.`)
};

const id_generate_description = /** @type {(inputs: Generate_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Buat dokumen untuk penerima terpilih - tanpa perlu konfigurasi email.`)
};

/**
* | output |
* | --- |
* | "Generate documents for the selected recipients - no email configuration needed." |
*
* @param {Generate_DescriptionInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_description = /** @type {((inputs?: Generate_DescriptionInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_DescriptionInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_description(inputs)
	return en_generate_description(inputs)
});
export { generate_description as "generate.description" }