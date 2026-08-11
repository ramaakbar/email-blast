/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Generate_Startdisabledcoverage2Inputs */

const en_generate_startdisabledcoverage2 = /** @type {(inputs: Generate_Startdisabledcoverage2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Select recipients with data for every required slot to generate.`)
};

const id_generate_startdisabledcoverage2 = /** @type {(inputs: Generate_Startdisabledcoverage2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pilih penerima yang datanya lengkap untuk semua slot agar bisa generate.`)
};

/**
* | output |
* | --- |
* | "Select recipients with data for every required slot to generate." |
*
* @param {Generate_Startdisabledcoverage2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_startdisabledcoverage2 = /** @type {((inputs?: Generate_Startdisabledcoverage2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_Startdisabledcoverage2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_startdisabledcoverage2(inputs)
	return en_generate_startdisabledcoverage2(inputs)
});
export { generate_startdisabledcoverage2 as "generate.startDisabledCoverage" }