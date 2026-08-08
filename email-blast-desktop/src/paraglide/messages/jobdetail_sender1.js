/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Jobdetail_Sender1Inputs */

const en_jobdetail_sender1 = /** @type {(inputs: Jobdetail_Sender1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sender`)
};

const id_jobdetail_sender1 = /** @type {(inputs: Jobdetail_Sender1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pengirim`)
};

/**
* | output |
* | --- |
* | "Sender" |
*
* @param {Jobdetail_Sender1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_sender1 = /** @type {((inputs?: Jobdetail_Sender1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Sender1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_jobdetail_sender1(inputs)
	return en_jobdetail_sender1(inputs)
});
export { jobdetail_sender1 as "jobDetail.sender" }