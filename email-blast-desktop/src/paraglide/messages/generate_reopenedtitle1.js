/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Generate_Reopenedtitle1Inputs */

const en_generate_reopenedtitle1 = /** @type {(inputs: Generate_Reopenedtitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Job Results`)
};

const id_generate_reopenedtitle1 = /** @type {(inputs: Generate_Reopenedtitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Hasil Pekerjaan`)
};

/**
* | output |
* | --- |
* | "Job Results" |
*
* @param {Generate_Reopenedtitle1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_reopenedtitle1 = /** @type {((inputs?: Generate_Reopenedtitle1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_Reopenedtitle1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_reopenedtitle1(inputs)
	return en_generate_reopenedtitle1(inputs)
});
export { generate_reopenedtitle1 as "generate.reopenedTitle" }