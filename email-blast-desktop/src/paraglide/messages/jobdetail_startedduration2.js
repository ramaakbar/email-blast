/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Jobdetail_Startedduration2Inputs */

const en_jobdetail_startedduration2 = /** @type {(inputs: Jobdetail_Startedduration2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Started / Duration`)
};

const id_jobdetail_startedduration2 = /** @type {(inputs: Jobdetail_Startedduration2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dimulai / Durasi`)
};

/**
* | output |
* | --- |
* | "Started / Duration" |
*
* @param {Jobdetail_Startedduration2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const jobdetail_startedduration2 = /** @type {((inputs?: Jobdetail_Startedduration2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Jobdetail_Startedduration2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_jobdetail_startedduration2(inputs)
	return en_jobdetail_startedduration2(inputs)
});
export { jobdetail_startedduration2 as "jobDetail.startedDuration" }