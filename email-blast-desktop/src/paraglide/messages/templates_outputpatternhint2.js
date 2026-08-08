/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Outputpatternhint2Inputs */

const en_templates_outputpatternhint2 = /** @type {(inputs: Templates_Outputpatternhint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generated files are named with this pattern, one per recipient.`)
};

const id_templates_outputpatternhint2 = /** @type {(inputs: Templates_Outputpatternhint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`File hasil generate diberi nama sesuai pola ini, satu per penerima.`)
};

/**
* | output |
* | --- |
* | "Generated files are named with this pattern, one per recipient." |
*
* @param {Templates_Outputpatternhint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_outputpatternhint2 = /** @type {((inputs?: Templates_Outputpatternhint2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Outputpatternhint2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_outputpatternhint2(inputs)
	return en_templates_outputpatternhint2(inputs)
});
export { templates_outputpatternhint2 as "templates.outputPatternHint" }