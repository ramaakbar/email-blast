/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ no: NonNullable<unknown>, name: NonNullable<unknown> }} Templates_Outputpatternplaceholder2Inputs */

const en_templates_outputpatternplaceholder2 = /** @type {(inputs: Templates_Outputpatternplaceholder2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`e.g. LOA_${i?.no}_${i?.name}.pdf`)
};

const id_templates_outputpatternplaceholder2 = /** @type {(inputs: Templates_Outputpatternplaceholder2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`mis. LOA_${i?.no}_${i?.name}.pdf`)
};

/**
* | output |
* | --- |
* | "e.g. LOA_{no}_{name}.pdf" |
*
* @param {Templates_Outputpatternplaceholder2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_outputpatternplaceholder2 = /** @type {((inputs: Templates_Outputpatternplaceholder2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Outputpatternplaceholder2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_outputpatternplaceholder2(inputs)
	return en_templates_outputpatternplaceholder2(inputs)
});
export { templates_outputpatternplaceholder2 as "templates.outputPatternPlaceholder" }