/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Jobdetail_Smtp1Inputs */

const en_jobdetail_smtp1 = /** @type {(inputs: Jobdetail_Smtp1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SMTP`)
};

const id_jobdetail_smtp1 = /** @type {(inputs: Jobdetail_Smtp1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SMTP`)
};

/**
* | output |
* | --- |
* | "SMTP" |
*
* @param {Jobdetail_Smtp1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_smtp1 = /** @type {((inputs?: Jobdetail_Smtp1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Smtp1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_jobdetail_smtp1(inputs)
	return en_jobdetail_smtp1(inputs)
});
export { jobdetail_smtp1 as "jobDetail.smtp" }