/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Jobdetail_Searchplaceholder2Inputs */

const en_jobdetail_searchplaceholder2 = /** @type {(inputs: Jobdetail_Searchplaceholder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Search recipient name or email…`)
};

const id_jobdetail_searchplaceholder2 = /** @type {(inputs: Jobdetail_Searchplaceholder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cari nama atau email penerima…`)
};

/**
* | output |
* | --- |
* | "Search recipient name or email…" |
*
* @param {Jobdetail_Searchplaceholder2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_searchplaceholder2 = /** @type {((inputs?: Jobdetail_Searchplaceholder2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Searchplaceholder2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_jobdetail_searchplaceholder2(inputs)
	return en_jobdetail_searchplaceholder2(inputs)
});
export { jobdetail_searchplaceholder2 as "jobDetail.searchPlaceholder" }