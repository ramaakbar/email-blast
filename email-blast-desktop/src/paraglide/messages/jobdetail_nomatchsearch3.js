/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Jobdetail_Nomatchsearch3Inputs */

const en_jobdetail_nomatchsearch3 = /** @type {(inputs: Jobdetail_Nomatchsearch3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No recipients match your search`)
};

const id_jobdetail_nomatchsearch3 = /** @type {(inputs: Jobdetail_Nomatchsearch3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tidak ada penerima yang cocok dengan pencarian`)
};

/**
* | output |
* | --- |
* | "No recipients match your search" |
*
* @param {Jobdetail_Nomatchsearch3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_nomatchsearch3 = /** @type {((inputs?: Jobdetail_Nomatchsearch3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Nomatchsearch3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_jobdetail_nomatchsearch3(inputs)
	return en_jobdetail_nomatchsearch3(inputs)
});
export { jobdetail_nomatchsearch3 as "jobDetail.noMatchSearch" }