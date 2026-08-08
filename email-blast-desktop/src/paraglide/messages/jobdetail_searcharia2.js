/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Jobdetail_Searcharia2Inputs */

const en_jobdetail_searcharia2 = /** @type {(inputs: Jobdetail_Searcharia2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Search recipients of this job`)
};

const id_jobdetail_searcharia2 = /** @type {(inputs: Jobdetail_Searcharia2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cari penerima pekerjaan ini`)
};

/**
* | output |
* | --- |
* | "Search recipients of this job" |
*
* @param {Jobdetail_Searcharia2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_searcharia2 = /** @type {((inputs?: Jobdetail_Searcharia2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Searcharia2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_jobdetail_searcharia2(inputs)
	return en_jobdetail_searcharia2(inputs)
});
export { jobdetail_searcharia2 as "jobDetail.searchAria" }