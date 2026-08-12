/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Generate_Jobpatternplaceholder2Inputs */

const en_generate_jobpatternplaceholder2 = /** @type {(inputs: Generate_Jobpatternplaceholder2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`e.g. BATCH_${i?.name}.pdf`)
};

const id_generate_jobpatternplaceholder2 = /** @type {(inputs: Generate_Jobpatternplaceholder2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`mis. BATCH_${i?.name}.pdf`)
};

/**
* | output |
* | --- |
* | "e.g. BATCH_{name}.pdf" |
*
* @param {Generate_Jobpatternplaceholder2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_jobpatternplaceholder2 = /** @type {((inputs: Generate_Jobpatternplaceholder2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_Jobpatternplaceholder2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_jobpatternplaceholder2(inputs)
	return en_generate_jobpatternplaceholder2(inputs)
});
export { generate_jobpatternplaceholder2 as "generate.jobPatternPlaceholder" }