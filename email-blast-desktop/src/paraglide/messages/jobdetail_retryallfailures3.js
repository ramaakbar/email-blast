/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Jobdetail_Retryallfailures3Inputs */

const en_jobdetail_retryallfailures3 = /** @type {(inputs: Jobdetail_Retryallfailures3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Retry All Failures (${i?.count})`)
};

const id_jobdetail_retryallfailures3 = /** @type {(inputs: Jobdetail_Retryallfailures3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Ulangi Semua yang Gagal (${i?.count})`)
};

/**
* | output |
* | --- |
* | "Retry All Failures ({count})" |
*
* @param {Jobdetail_Retryallfailures3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_retryallfailures3 = /** @type {((inputs: Jobdetail_Retryallfailures3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Retryallfailures3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_jobdetail_retryallfailures3(inputs)
	return en_jobdetail_retryallfailures3(inputs)
});
export { jobdetail_retryallfailures3 as "jobDetail.retryAllFailures" }