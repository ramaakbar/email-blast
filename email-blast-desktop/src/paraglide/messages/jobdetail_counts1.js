/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ sent: NonNullable<unknown>, failed: NonNullable<unknown>, skipped: NonNullable<unknown> }} Jobdetail_Counts1Inputs */

const en_jobdetail_counts1 = /** @type {(inputs: Jobdetail_Counts1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.sent} sent · ${i?.failed} failed · ${i?.skipped} skipped`)
};

const id_jobdetail_counts1 = /** @type {(inputs: Jobdetail_Counts1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.sent} terkirim · ${i?.failed} gagal · ${i?.skipped} dilewati`)
};

/**
* | output |
* | --- |
* | "{sent} sent · {failed} failed · {skipped} skipped" |
*
* @param {Jobdetail_Counts1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_counts1 = /** @type {((inputs: Jobdetail_Counts1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Counts1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_jobdetail_counts1(inputs)
	return en_jobdetail_counts1(inputs)
});
export { jobdetail_counts1 as "jobDetail.counts" }