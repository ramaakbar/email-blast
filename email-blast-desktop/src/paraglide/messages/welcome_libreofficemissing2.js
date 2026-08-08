/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Welcome_Libreofficemissing2Inputs */

const en_welcome_libreofficemissing2 = /** @type {(inputs: Welcome_Libreofficemissing2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`LibreOffice is not installed`)
};

const id_welcome_libreofficemissing2 = /** @type {(inputs: Welcome_Libreofficemissing2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`LibreOffice belum terpasang`)
};

/**
* | output |
* | --- |
* | "LibreOffice is not installed" |
*
* @param {Welcome_Libreofficemissing2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const welcome_libreofficemissing2 = /** @type {((inputs?: Welcome_Libreofficemissing2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Welcome_Libreofficemissing2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_welcome_libreofficemissing2(inputs)
	return en_welcome_libreofficemissing2(inputs)
});
export { welcome_libreofficemissing2 as "welcome.libreOfficeMissing" }