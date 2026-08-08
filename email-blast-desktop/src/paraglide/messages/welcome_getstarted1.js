/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Welcome_Getstarted1Inputs */

const en_welcome_getstarted1 = /** @type {(inputs: Welcome_Getstarted1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Get Started`)
};

const id_welcome_getstarted1 = /** @type {(inputs: Welcome_Getstarted1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mulai`)
};

/**
* | output |
* | --- |
* | "Get Started" |
*
* @param {Welcome_Getstarted1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const welcome_getstarted1 = /** @type {((inputs?: Welcome_Getstarted1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Welcome_Getstarted1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_welcome_getstarted1(inputs)
	return en_welcome_getstarted1(inputs)
});
export { welcome_getstarted1 as "welcome.getStarted" }