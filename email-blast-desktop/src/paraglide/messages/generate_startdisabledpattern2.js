/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Generate_Startdisabledpattern2Inputs */

const en_generate_startdisabledpattern2 = /** @type {(inputs: Generate_Startdisabledpattern2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fix the output pattern - it references a slot that one of the templates does not declare.`)
};

const id_generate_startdisabledpattern2 = /** @type {(inputs: Generate_Startdisabledpattern2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Perbaiki pola nama berkas - pola merujuk slot yang tidak dideklarasikan salah satu template.`)
};

/**
* | output |
* | --- |
* | "Fix the output pattern - it references a slot that one of the templates does not declare." |
*
* @param {Generate_Startdisabledpattern2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_startdisabledpattern2 = /** @type {((inputs?: Generate_Startdisabledpattern2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_Startdisabledpattern2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_startdisabledpattern2(inputs)
	return en_generate_startdisabledpattern2(inputs)
});
export { generate_startdisabledpattern2 as "generate.startDisabledPattern" }