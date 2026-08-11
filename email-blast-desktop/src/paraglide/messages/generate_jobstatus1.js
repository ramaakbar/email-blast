/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Generate_Jobstatus1Inputs */

const en_generate_jobstatus1 = /** @type {(inputs: Generate_Jobstatus1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Status`)
};

const id_generate_jobstatus1 = /** @type {(inputs: Generate_Jobstatus1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Status`)
};

/**
* | output |
* | --- |
* | "Status" |
*
* @param {Generate_Jobstatus1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_jobstatus1 = /** @type {((inputs?: Generate_Jobstatus1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_Jobstatus1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_jobstatus1(inputs)
	return en_generate_jobstatus1(inputs)
});
export { generate_jobstatus1 as "generate.jobStatus" }