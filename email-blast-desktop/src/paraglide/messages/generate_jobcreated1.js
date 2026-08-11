/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Generate_Jobcreated1Inputs */

const en_generate_jobcreated1 = /** @type {(inputs: Generate_Jobcreated1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Created`)
};

const id_generate_jobcreated1 = /** @type {(inputs: Generate_Jobcreated1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dibuat`)
};

/**
* | output |
* | --- |
* | "Created" |
*
* @param {Generate_Jobcreated1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_jobcreated1 = /** @type {((inputs?: Generate_Jobcreated1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_Jobcreated1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_jobcreated1(inputs)
	return en_generate_jobcreated1(inputs)
});
export { generate_jobcreated1 as "generate.jobCreated" }