/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Jobdetail_Fixemail2Inputs */

const en_jobdetail_fixemail2 = /** @type {(inputs: Jobdetail_Fixemail2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fix email`)
};

const id_jobdetail_fixemail2 = /** @type {(inputs: Jobdetail_Fixemail2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Perbaiki email`)
};

/**
* | output |
* | --- |
* | "Fix email" |
*
* @param {Jobdetail_Fixemail2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_fixemail2 = /** @type {((inputs?: Jobdetail_Fixemail2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Fixemail2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_jobdetail_fixemail2(inputs)
	return en_jobdetail_fixemail2(inputs)
});
export { jobdetail_fixemail2 as "jobDetail.fixEmail" }