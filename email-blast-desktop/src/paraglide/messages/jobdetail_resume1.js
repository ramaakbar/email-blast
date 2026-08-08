/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Jobdetail_Resume1Inputs */

const en_jobdetail_resume1 = /** @type {(inputs: Jobdetail_Resume1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Resume`)
};

const id_jobdetail_resume1 = /** @type {(inputs: Jobdetail_Resume1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lanjutkan`)
};

/**
* | output |
* | --- |
* | "Resume" |
*
* @param {Jobdetail_Resume1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_resume1 = /** @type {((inputs?: Jobdetail_Resume1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Resume1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_jobdetail_resume1(inputs)
	return en_jobdetail_resume1(inputs)
});
export { jobdetail_resume1 as "jobDetail.resume" }