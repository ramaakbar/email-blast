/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Generate_Pastjobs1Inputs */

const en_generate_pastjobs1 = /** @type {(inputs: Generate_Pastjobs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Past Generate Jobs`)
};

const id_generate_pastjobs1 = /** @type {(inputs: Generate_Pastjobs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Riwayat Generate`)
};

/**
* | output |
* | --- |
* | "Past Generate Jobs" |
*
* @param {Generate_Pastjobs1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_pastjobs1 = /** @type {((inputs?: Generate_Pastjobs1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_Pastjobs1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_pastjobs1(inputs)
	return en_generate_pastjobs1(inputs)
});
export { generate_pastjobs1 as "generate.pastJobs" }