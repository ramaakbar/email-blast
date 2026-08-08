/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Jobdetail_Jobnotfoundhint4Inputs */

const en_jobdetail_jobnotfoundhint4 = /** @type {(inputs: Jobdetail_Jobnotfoundhint4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`It may have been removed from the database.`)
};

const id_jobdetail_jobnotfoundhint4 = /** @type {(inputs: Jobdetail_Jobnotfoundhint4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mungkin sudah dihapus dari database.`)
};

/**
* | output |
* | --- |
* | "It may have been removed from the database." |
*
* @param {Jobdetail_Jobnotfoundhint4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_jobnotfoundhint4 = /** @type {((inputs?: Jobdetail_Jobnotfoundhint4Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Jobnotfoundhint4Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_jobdetail_jobnotfoundhint4(inputs)
	return en_jobdetail_jobnotfoundhint4(inputs)
});
export { jobdetail_jobnotfoundhint4 as "jobDetail.jobNotFoundHint" }