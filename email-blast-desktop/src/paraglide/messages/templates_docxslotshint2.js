/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ placeholders: NonNullable<unknown> }} Templates_Docxslotshint2Inputs */

const en_templates_docxslotshint2 = /** @type {(inputs: Templates_Docxslotshint2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Detected from the ${i?.placeholders} in the document. Add, rename, or remove slots freely.`)
};

const id_templates_docxslotshint2 = /** @type {(inputs: Templates_Docxslotshint2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Terdeteksi dari ${i?.placeholders} di dokumen. Tambah, ganti nama, atau hapus slot dengan bebas.`)
};

/**
* | output |
* | --- |
* | "Detected from the {placeholders} in the document. Add, rename, or remove slots freely." |
*
* @param {Templates_Docxslotshint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_docxslotshint2 = /** @type {((inputs: Templates_Docxslotshint2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Docxslotshint2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_docxslotshint2(inputs)
	return en_templates_docxslotshint2(inputs)
});
export { templates_docxslotshint2 as "templates.docxSlotsHint" }