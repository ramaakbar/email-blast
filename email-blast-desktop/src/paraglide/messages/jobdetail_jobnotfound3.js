/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Jobdetail_Jobnotfound3Inputs */

const en_jobdetail_jobnotfound3 = /** @type {(inputs: Jobdetail_Jobnotfound3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Job not found`)
};

const id_jobdetail_jobnotfound3 = /** @type {(inputs: Jobdetail_Jobnotfound3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pekerjaan tidak ditemukan`)
};

/**
* | output |
* | --- |
* | "Job not found" |
*
* @param {Jobdetail_Jobnotfound3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_jobnotfound3 = /** @type {((inputs?: Jobdetail_Jobnotfound3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Jobnotfound3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_jobdetail_jobnotfound3(inputs)
	return en_jobdetail_jobnotfound3(inputs)
});
export { jobdetail_jobnotfound3 as "jobDetail.jobNotFound" }