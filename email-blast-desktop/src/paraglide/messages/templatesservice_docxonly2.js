/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templatesservice_Docxonly2Inputs */

const en_templatesservice_docxonly2 = /** @type {(inputs: Templatesservice_Docxonly2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Slot scanning works on .docx files only.`)
};

const id_templatesservice_docxonly2 = /** @type {(inputs: Templatesservice_Docxonly2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pemindaian slot hanya berfungsi untuk file .docx.`)
};

/**
* | output |
* | --- |
* | "Slot scanning works on .docx files only." |
*
* @param {Templatesservice_Docxonly2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templatesservice_docxonly2 = /** @type {((inputs?: Templatesservice_Docxonly2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templatesservice_Docxonly2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templatesservice_docxonly2(inputs)
	return en_templatesservice_docxonly2(inputs)
});
export { templatesservice_docxonly2 as "templatesService.docxOnly" }