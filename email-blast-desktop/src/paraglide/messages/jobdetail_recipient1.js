/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Jobdetail_Recipient1Inputs */

const en_jobdetail_recipient1 = /** @type {(inputs: Jobdetail_Recipient1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Recipient`)
};

const id_jobdetail_recipient1 = /** @type {(inputs: Jobdetail_Recipient1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Penerima`)
};

/**
* | output |
* | --- |
* | "Recipient" |
*
* @param {Jobdetail_Recipient1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_recipient1 = /** @type {((inputs?: Jobdetail_Recipient1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Recipient1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_jobdetail_recipient1(inputs)
	return en_jobdetail_recipient1(inputs)
});
export { jobdetail_recipient1 as "jobDetail.recipient" }