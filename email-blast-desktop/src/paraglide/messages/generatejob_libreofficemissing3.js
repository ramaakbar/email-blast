/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Generatejob_Libreofficemissing3Inputs */

const en_generatejob_libreofficemissing3 = /** @type {(inputs: Generatejob_Libreofficemissing3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`LibreOffice is not installed, so DOCX letters cannot be converted to PDF.`)
};

const id_generatejob_libreofficemissing3 = /** @type {(inputs: Generatejob_Libreofficemissing3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`LibreOffice belum terpasang, jadi surat DOCX tidak bisa diubah ke PDF.`)
};

/**
* | output |
* | --- |
* | "LibreOffice is not installed, so DOCX letters cannot be converted to PDF." |
*
* @param {Generatejob_Libreofficemissing3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generatejob_libreofficemissing3 = /** @type {((inputs?: Generatejob_Libreofficemissing3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generatejob_Libreofficemissing3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generatejob_libreofficemissing3(inputs)
	return en_generatejob_libreofficemissing3(inputs)
});
export { generatejob_libreofficemissing3 as "generateJob.libreOfficeMissing" }