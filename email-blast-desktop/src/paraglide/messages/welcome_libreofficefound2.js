/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Welcome_Libreofficefound2Inputs */

const en_welcome_libreofficefound2 = /** @type {(inputs: Welcome_Libreofficefound2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`LibreOffice found`)
};

const id_welcome_libreofficefound2 = /** @type {(inputs: Welcome_Libreofficefound2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`LibreOffice ditemukan`)
};

/**
* | output |
* | --- |
* | "LibreOffice found" |
*
* @param {Welcome_Libreofficefound2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const welcome_libreofficefound2 = /** @type {((inputs?: Welcome_Libreofficefound2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Welcome_Libreofficefound2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_welcome_libreofficefound2(inputs)
	return en_welcome_libreofficefound2(inputs)
});
export { welcome_libreofficefound2 as "welcome.libreOfficeFound" }