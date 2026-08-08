/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ fileName: NonNullable<unknown> }} Templates_Unsupportedfile1Inputs */

const en_templates_unsupportedfile1 = /** @type {(inputs: Templates_Unsupportedfile1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`"${i?.fileName}" is not a supported template. Choose a .docx letter or a .png/.jpg/.jpeg certificate image.`)
};

const id_templates_unsupportedfile1 = /** @type {(inputs: Templates_Unsupportedfile1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`"${i?.fileName}" bukan template yang didukung. Pilih surat .docx atau gambar sertifikat .png/.jpg/.jpeg.`)
};

/**
* | output |
* | --- |
* | "\"{fileName}\" is not a supported template. Choose a .docx letter or a .png/.jpg/.jpeg certificate image." |
*
* @param {Templates_Unsupportedfile1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_unsupportedfile1 = /** @type {((inputs: Templates_Unsupportedfile1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Unsupportedfile1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_unsupportedfile1(inputs)
	return en_templates_unsupportedfile1(inputs)
});
export { templates_unsupportedfile1 as "templates.unsupportedFile" }