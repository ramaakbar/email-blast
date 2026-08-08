/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Jobdetail_Retry1Inputs */

const en_jobdetail_retry1 = /** @type {(inputs: Jobdetail_Retry1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Retry`)
};

const id_jobdetail_retry1 = /** @type {(inputs: Jobdetail_Retry1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ulangi`)
};

/**
* | output |
* | --- |
* | "Retry" |
*
* @param {Jobdetail_Retry1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_retry1 = /** @type {((inputs?: Jobdetail_Retry1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Retry1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_jobdetail_retry1(inputs)
	return en_jobdetail_retry1(inputs)
});
export { jobdetail_retry1 as "jobDetail.retry" }