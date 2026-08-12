/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Generate_Allvaluesassigned2Inputs */

const en_generate_allvaluesassigned2 = /** @type {(inputs: Generate_Allvaluesassigned2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Every template-column value is assigned to a template.`)
};

const id_generate_allvaluesassigned2 = /** @type {(inputs: Generate_Allvaluesassigned2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Semua nilai kolom template sudah ditetapkan ke template.`)
};

/**
* | output |
* | --- |
* | "Every template-column value is assigned to a template." |
*
* @param {Generate_Allvaluesassigned2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_allvaluesassigned2 = /** @type {((inputs?: Generate_Allvaluesassigned2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_Allvaluesassigned2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_allvaluesassigned2(inputs)
	return en_generate_allvaluesassigned2(inputs)
});
export { generate_allvaluesassigned2 as "generate.allValuesAssigned" }