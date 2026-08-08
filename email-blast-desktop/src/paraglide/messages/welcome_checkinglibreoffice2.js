/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Welcome_Checkinglibreoffice2Inputs */

const en_welcome_checkinglibreoffice2 = /** @type {(inputs: Welcome_Checkinglibreoffice2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Checking for LibreOffice...`)
};

const id_welcome_checkinglibreoffice2 = /** @type {(inputs: Welcome_Checkinglibreoffice2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Memeriksa LibreOffice…`)
};

/**
* | output |
* | --- |
* | "Checking for LibreOffice..." |
*
* @param {Welcome_Checkinglibreoffice2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const welcome_checkinglibreoffice2 = /** @type {((inputs?: Welcome_Checkinglibreoffice2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Welcome_Checkinglibreoffice2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_welcome_checkinglibreoffice2(inputs)
	return en_welcome_checkinglibreoffice2(inputs)
});
export { welcome_checkinglibreoffice2 as "welcome.checkingLibreOffice" }