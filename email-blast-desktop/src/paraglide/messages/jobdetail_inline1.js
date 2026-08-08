/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Jobdetail_Inline1Inputs */

const en_jobdetail_inline1 = /** @type {(inputs: Jobdetail_Inline1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`(inline)`)
};

const id_jobdetail_inline1 = /** @type {(inputs: Jobdetail_Inline1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`(inline)`)
};

/**
* | output |
* | --- |
* | "(inline)" |
*
* @param {Jobdetail_Inline1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_inline1 = /** @type {((inputs?: Jobdetail_Inline1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Inline1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_jobdetail_inline1(inputs)
	return en_jobdetail_inline1(inputs)
});
export { jobdetail_inline1 as "jobDetail.inline" }