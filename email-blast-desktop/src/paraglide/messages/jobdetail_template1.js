/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Jobdetail_Template1Inputs */

const en_jobdetail_template1 = /** @type {(inputs: Jobdetail_Template1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Template`)
};

const id_jobdetail_template1 = /** @type {(inputs: Jobdetail_Template1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Template`)
};

/**
* | output |
* | --- |
* | "Template" |
*
* @param {Jobdetail_Template1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_template1 = /** @type {((inputs?: Jobdetail_Template1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Template1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_jobdetail_template1(inputs)
	return en_jobdetail_template1(inputs)
});
export { jobdetail_template1 as "jobDetail.template" }