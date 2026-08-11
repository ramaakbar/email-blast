/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Generate_Jobtemplate1Inputs */

const en_generate_jobtemplate1 = /** @type {(inputs: Generate_Jobtemplate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Template`)
};

const id_generate_jobtemplate1 = /** @type {(inputs: Generate_Jobtemplate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Template`)
};

/**
* | output |
* | --- |
* | "Template" |
*
* @param {Generate_Jobtemplate1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_jobtemplate1 = /** @type {((inputs?: Generate_Jobtemplate1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_Jobtemplate1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_jobtemplate1(inputs)
	return en_generate_jobtemplate1(inputs)
});
export { generate_jobtemplate1 as "generate.jobTemplate" }