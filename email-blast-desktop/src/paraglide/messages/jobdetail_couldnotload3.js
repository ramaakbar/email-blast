/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Jobdetail_Couldnotload3Inputs */

const en_jobdetail_couldnotload3 = /** @type {(inputs: Jobdetail_Couldnotload3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not load this job.`)
};

const id_jobdetail_couldnotload3 = /** @type {(inputs: Jobdetail_Couldnotload3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gagal memuat pekerjaan ini.`)
};

/**
* | output |
* | --- |
* | "Could not load this job." |
*
* @param {Jobdetail_Couldnotload3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_couldnotload3 = /** @type {((inputs?: Jobdetail_Couldnotload3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Couldnotload3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_jobdetail_couldnotload3(inputs)
	return en_jobdetail_couldnotload3(inputs)
});
export { jobdetail_couldnotload3 as "jobDetail.couldNotLoad" }