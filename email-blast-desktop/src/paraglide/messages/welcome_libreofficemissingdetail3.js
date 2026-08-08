/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Welcome_Libreofficemissingdetail3Inputs */

const en_welcome_libreofficemissingdetail3 = /** @type {(inputs: Welcome_Libreofficemissingdetail3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Email Blast uses LibreOffice to convert filled letters to PDF.`)
};

const id_welcome_libreofficemissingdetail3 = /** @type {(inputs: Welcome_Libreofficemissingdetail3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Email Blast menggunakan LibreOffice untuk mengubah surat terisi menjadi PDF.`)
};

/**
* | output |
* | --- |
* | "Email Blast uses LibreOffice to convert filled letters to PDF." |
*
* @param {Welcome_Libreofficemissingdetail3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const welcome_libreofficemissingdetail3 = /** @type {((inputs?: Welcome_Libreofficemissingdetail3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Welcome_Libreofficemissingdetail3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_welcome_libreofficemissingdetail3(inputs)
	return en_welcome_libreofficemissingdetail3(inputs)
});
export { welcome_libreofficemissingdetail3 as "welcome.libreOfficeMissingDetail" }