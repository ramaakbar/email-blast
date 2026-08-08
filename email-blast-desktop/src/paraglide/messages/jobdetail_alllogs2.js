/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Jobdetail_Alllogs2Inputs */

const en_jobdetail_alllogs2 = /** @type {(inputs: Jobdetail_Alllogs2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`All logs`)
};

const id_jobdetail_alllogs2 = /** @type {(inputs: Jobdetail_Alllogs2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Semua log`)
};

/**
* | output |
* | --- |
* | "All logs" |
*
* @param {Jobdetail_Alllogs2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_alllogs2 = /** @type {((inputs?: Jobdetail_Alllogs2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Alllogs2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_jobdetail_alllogs2(inputs)
	return en_jobdetail_alllogs2(inputs)
});
export { jobdetail_alllogs2 as "jobDetail.allLogs" }