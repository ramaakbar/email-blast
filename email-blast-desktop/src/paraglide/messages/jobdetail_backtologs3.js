/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Jobdetail_Backtologs3Inputs */

const en_jobdetail_backtologs3 = /** @type {(inputs: Jobdetail_Backtologs3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Back to Logs`)
};

const id_jobdetail_backtologs3 = /** @type {(inputs: Jobdetail_Backtologs3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Kembali ke Log`)
};

/**
* | output |
* | --- |
* | "Back to Logs" |
*
* @param {Jobdetail_Backtologs3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_backtologs3 = /** @type {((inputs?: Jobdetail_Backtologs3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Backtologs3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_jobdetail_backtologs3(inputs)
	return en_jobdetail_backtologs3(inputs)
});
export { jobdetail_backtologs3 as "jobDetail.backToLogs" }