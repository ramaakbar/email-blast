/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Nav_GenerateInputs */

const en_nav_generate = /** @type {(inputs: Nav_GenerateInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generate`)
};

const id_nav_generate = /** @type {(inputs: Nav_GenerateInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generate`)
};

/**
* | output |
* | --- |
* | "Generate" |
*
* @param {Nav_GenerateInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const nav_generate = /** @type {((inputs?: Nav_GenerateInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_GenerateInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_nav_generate(inputs)
	return en_nav_generate(inputs)
});
export { nav_generate as "nav.generate" }