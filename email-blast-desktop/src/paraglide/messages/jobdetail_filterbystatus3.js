/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Jobdetail_Filterbystatus3Inputs */

const en_jobdetail_filterbystatus3 = /** @type {(inputs: Jobdetail_Filterbystatus3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Filter recipients by status`)
};

const id_jobdetail_filterbystatus3 = /** @type {(inputs: Jobdetail_Filterbystatus3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Saring penerima berdasarkan status`)
};

/**
* | output |
* | --- |
* | "Filter recipients by status" |
*
* @param {Jobdetail_Filterbystatus3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_filterbystatus3 = /** @type {((inputs?: Jobdetail_Filterbystatus3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Filterbystatus3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_jobdetail_filterbystatus3(inputs)
	return en_jobdetail_filterbystatus3(inputs)
});
export { jobdetail_filterbystatus3 as "jobDetail.filterByStatus" }