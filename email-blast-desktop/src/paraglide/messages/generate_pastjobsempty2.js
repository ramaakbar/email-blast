/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Generate_Pastjobsempty2Inputs */

const en_generate_pastjobsempty2 = /** @type {(inputs: Generate_Pastjobsempty2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No generate jobs yet.`)
};

const id_generate_pastjobsempty2 = /** @type {(inputs: Generate_Pastjobsempty2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Belum ada riwayat generate.`)
};

/**
* | output |
* | --- |
* | "No generate jobs yet." |
*
* @param {Generate_Pastjobsempty2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_pastjobsempty2 = /** @type {((inputs?: Generate_Pastjobsempty2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_Pastjobsempty2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_pastjobsempty2(inputs)
	return en_generate_pastjobsempty2(inputs)
});
export { generate_pastjobsempty2 as "generate.pastJobsEmpty" }