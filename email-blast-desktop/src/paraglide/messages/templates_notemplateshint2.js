/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Notemplateshint2Inputs */

const en_templates_notemplateshint2 = /** @type {(inputs: Templates_Notemplateshint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Register a DOCX letter template or an image certificate template to generate personalized documents.`)
};

const id_templates_notemplateshint2 = /** @type {(inputs: Templates_Notemplateshint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Daftarkan template surat DOCX atau template sertifikat gambar untuk membuat dokumen personal.`)
};

/**
* | output |
* | --- |
* | "Register a DOCX letter template or an image certificate template to generate personalized documents." |
*
* @param {Templates_Notemplateshint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_notemplateshint2 = /** @type {((inputs?: Templates_Notemplateshint2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Notemplateshint2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_notemplateshint2(inputs)
	return en_templates_notemplateshint2(inputs)
});
export { templates_notemplateshint2 as "templates.noTemplatesHint" }