/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Welcome_Checkagain1Inputs */

const en_welcome_checkagain1 = /** @type {(inputs: Welcome_Checkagain1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Check Again`)
};

const id_welcome_checkagain1 = /** @type {(inputs: Welcome_Checkagain1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Periksa Lagi`)
};

/**
* | output |
* | --- |
* | "Check Again" |
*
* @param {Welcome_Checkagain1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const welcome_checkagain1 = /** @type {((inputs?: Welcome_Checkagain1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Welcome_Checkagain1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_welcome_checkagain1(inputs)
	return en_welcome_checkagain1(inputs)
});
export { welcome_checkagain1 as "welcome.checkAgain" }