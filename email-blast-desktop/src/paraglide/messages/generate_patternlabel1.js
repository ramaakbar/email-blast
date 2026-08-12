/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Generate_Patternlabel1Inputs */

const en_generate_patternlabel1 = /** @type {(inputs: Generate_Patternlabel1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Output naming pattern (shared by all templates)`)
};

const id_generate_patternlabel1 = /** @type {(inputs: Generate_Patternlabel1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pola penamaan berkas (dipakai bersama semua template)`)
};

/**
* | output |
* | --- |
* | "Output naming pattern (shared by all templates)" |
*
* @param {Generate_Patternlabel1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_patternlabel1 = /** @type {((inputs?: Generate_Patternlabel1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_Patternlabel1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_patternlabel1(inputs)
	return en_generate_patternlabel1(inputs)
});
export { generate_patternlabel1 as "generate.patternLabel" }