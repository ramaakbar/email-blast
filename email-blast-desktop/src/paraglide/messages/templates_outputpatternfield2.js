/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Outputpatternfield2Inputs */

const en_templates_outputpatternfield2 = /** @type {(inputs: Templates_Outputpatternfield2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Output pattern`)
};

const id_templates_outputpatternfield2 = /** @type {(inputs: Templates_Outputpatternfield2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pola output`)
};

/**
* | output |
* | --- |
* | "Output pattern" |
*
* @param {Templates_Outputpatternfield2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_outputpatternfield2 = /** @type {((inputs?: Templates_Outputpatternfield2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Outputpatternfield2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_outputpatternfield2(inputs)
	return en_templates_outputpatternfield2(inputs)
});
export { templates_outputpatternfield2 as "templates.outputPatternField" }