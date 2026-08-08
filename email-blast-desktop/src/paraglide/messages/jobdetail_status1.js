/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Jobdetail_Status1Inputs */

const en_jobdetail_status1 = /** @type {(inputs: Jobdetail_Status1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Status`)
};

const id_jobdetail_status1 = /** @type {(inputs: Jobdetail_Status1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Status`)
};

/**
* | output |
* | --- |
* | "Status" |
*
* @param {Jobdetail_Status1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_status1 = /** @type {((inputs?: Jobdetail_Status1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Status1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_jobdetail_status1(inputs)
	return en_jobdetail_status1(inputs)
});
export { jobdetail_status1 as "jobDetail.status" }