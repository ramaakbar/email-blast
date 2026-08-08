/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Jobdetail_Error1Inputs */

const en_jobdetail_error1 = /** @type {(inputs: Jobdetail_Error1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Error`)
};

const id_jobdetail_error1 = /** @type {(inputs: Jobdetail_Error1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Kesalahan`)
};

/**
* | output |
* | --- |
* | "Error" |
*
* @param {Jobdetail_Error1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_error1 = /** @type {((inputs?: Jobdetail_Error1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Error1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_jobdetail_error1(inputs)
	return en_jobdetail_error1(inputs)
});
export { jobdetail_error1 as "jobDetail.error" }