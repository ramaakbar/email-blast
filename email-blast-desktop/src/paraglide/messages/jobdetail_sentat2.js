/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Jobdetail_Sentat2Inputs */

const en_jobdetail_sentat2 = /** @type {(inputs: Jobdetail_Sentat2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sent at`)
};

const id_jobdetail_sentat2 = /** @type {(inputs: Jobdetail_Sentat2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dikirim pada`)
};

/**
* | output |
* | --- |
* | "Sent at" |
*
* @param {Jobdetail_Sentat2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_sentat2 = /** @type {((inputs?: Jobdetail_Sentat2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Sentat2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_jobdetail_sentat2(inputs)
	return en_jobdetail_sentat2(inputs)
});
export { jobdetail_sentat2 as "jobDetail.sentAt" }