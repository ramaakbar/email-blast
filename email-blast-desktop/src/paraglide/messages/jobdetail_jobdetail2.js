/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Jobdetail_Jobdetail2Inputs */

const en_jobdetail_jobdetail2 = /** @type {(inputs: Jobdetail_Jobdetail2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Job detail`)
};

const id_jobdetail_jobdetail2 = /** @type {(inputs: Jobdetail_Jobdetail2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Detail pekerjaan`)
};

/**
* | output |
* | --- |
* | "Job detail" |
*
* @param {Jobdetail_Jobdetail2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_jobdetail2 = /** @type {((inputs?: Jobdetail_Jobdetail2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Jobdetail2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_jobdetail_jobdetail2(inputs)
	return en_jobdetail_jobdetail2(inputs)
});
export { jobdetail_jobdetail2 as "jobDetail.jobDetail" }