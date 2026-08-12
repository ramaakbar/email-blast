/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Jobdetail_Fixemailtitle3Inputs */

const en_jobdetail_fixemailtitle3 = /** @type {(inputs: Jobdetail_Fixemailtitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fix email address`)
};

const id_jobdetail_fixemailtitle3 = /** @type {(inputs: Jobdetail_Fixemailtitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Perbaiki alamat email`)
};

/**
* | output |
* | --- |
* | "Fix email address" |
*
* @param {Jobdetail_Fixemailtitle3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_fixemailtitle3 = /** @type {((inputs?: Jobdetail_Fixemailtitle3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Fixemailtitle3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_jobdetail_fixemailtitle3(inputs)
	return en_jobdetail_fixemailtitle3(inputs)
});
export { jobdetail_fixemailtitle3 as "jobDetail.fixEmailTitle" }