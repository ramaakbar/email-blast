/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Jobdetail_Loadingjob2Inputs */

const en_jobdetail_loadingjob2 = /** @type {(inputs: Jobdetail_Loadingjob2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Loading job…`)
};

const id_jobdetail_loadingjob2 = /** @type {(inputs: Jobdetail_Loadingjob2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Memuat pekerjaan…`)
};

/**
* | output |
* | --- |
* | "Loading job…" |
*
* @param {Jobdetail_Loadingjob2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_loadingjob2 = /** @type {((inputs?: Jobdetail_Loadingjob2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Loadingjob2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_jobdetail_loadingjob2(inputs)
	return en_jobdetail_loadingjob2(inputs)
});
export { jobdetail_loadingjob2 as "jobDetail.loadingJob" }