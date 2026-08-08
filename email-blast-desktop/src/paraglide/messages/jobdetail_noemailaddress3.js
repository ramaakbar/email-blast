/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Jobdetail_Noemailaddress3Inputs */

const en_jobdetail_noemailaddress3 = /** @type {(inputs: Jobdetail_Noemailaddress3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No email address`)
};

const id_jobdetail_noemailaddress3 = /** @type {(inputs: Jobdetail_Noemailaddress3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tidak ada alamat email`)
};

/**
* | output |
* | --- |
* | "No email address" |
*
* @param {Jobdetail_Noemailaddress3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_noemailaddress3 = /** @type {((inputs?: Jobdetail_Noemailaddress3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Noemailaddress3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_jobdetail_noemailaddress3(inputs)
	return en_jobdetail_noemailaddress3(inputs)
});
export { jobdetail_noemailaddress3 as "jobDetail.noEmailAddress" }