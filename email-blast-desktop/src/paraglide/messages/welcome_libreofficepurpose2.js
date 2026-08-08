/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Welcome_Libreofficepurpose2Inputs */

const en_welcome_libreofficepurpose2 = /** @type {(inputs: Welcome_Libreofficepurpose2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Used to convert letters to PDF`)
};

const id_welcome_libreofficepurpose2 = /** @type {(inputs: Welcome_Libreofficepurpose2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Digunakan untuk mengubah surat menjadi PDF`)
};

/**
* | output |
* | --- |
* | "Used to convert letters to PDF" |
*
* @param {Welcome_Libreofficepurpose2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const welcome_libreofficepurpose2 = /** @type {((inputs?: Welcome_Libreofficepurpose2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Welcome_Libreofficepurpose2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_welcome_libreofficepurpose2(inputs)
	return en_welcome_libreofficepurpose2(inputs)
});
export { welcome_libreofficepurpose2 as "welcome.libreOfficePurpose" }