/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Generate_Patternhint1Inputs */

const en_generate_patternhint1 = /** @type {(inputs: Generate_Patternhint1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`All recipients of this job are named by this one pattern, whichever template they used.`)
};

const id_generate_patternhint1 = /** @type {(inputs: Generate_Patternhint1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Semua penerima pekerjaan ini dinamai dengan satu pola ini, apa pun template yang dipakai.`)
};

/**
* | output |
* | --- |
* | "All recipients of this job are named by this one pattern, whichever template they used." |
*
* @param {Generate_Patternhint1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_patternhint1 = /** @type {((inputs?: Generate_Patternhint1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_Patternhint1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_patternhint1(inputs)
	return en_generate_patternhint1(inputs)
});
export { generate_patternhint1 as "generate.patternHint" }