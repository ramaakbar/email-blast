/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Generate_TitleInputs */

const en_generate_title = /** @type {(inputs: Generate_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generate`)
};

const id_generate_title = /** @type {(inputs: Generate_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generate`)
};

/**
* | output |
* | --- |
* | "Generate" |
*
* @param {Generate_TitleInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_title = /** @type {((inputs?: Generate_TitleInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_TitleInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_title(inputs)
	return en_generate_title(inputs)
});
export { generate_title as "generate.title" }