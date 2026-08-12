/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Generate_Templatecoverageok2Inputs */

const en_generate_templatecoverageok2 = /** @type {(inputs: Generate_Templatecoverageok2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`All ${i?.count} recipients routed to this template have data for every required slot.`)
};

const id_generate_templatecoverageok2 = /** @type {(inputs: Generate_Templatecoverageok2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Semua ${i?.count} penerima yang dirutekan ke template ini punya data untuk setiap slot yang dibutuhkan.`)
};

/**
* | output |
* | --- |
* | "All {count} recipients routed to this template have data for every required slot." |
*
* @param {Generate_Templatecoverageok2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_templatecoverageok2 = /** @type {((inputs: Generate_Templatecoverageok2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_Templatecoverageok2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_templatecoverageok2(inputs)
	return en_generate_templatecoverageok2(inputs)
});
export { generate_templatecoverageok2 as "generate.templateCoverageOk" }