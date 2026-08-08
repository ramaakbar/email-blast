/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Logs_Jobscreatedfrom2Inputs */

const en_logs_jobscreatedfrom2 = /** @type {(inputs: Logs_Jobscreatedfrom2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Jobs created from`)
};

const id_logs_jobscreatedfrom2 = /** @type {(inputs: Logs_Jobscreatedfrom2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pekerjaan dibuat dari`)
};

/**
* | output |
* | --- |
* | "Jobs created from" |
*
* @param {Logs_Jobscreatedfrom2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_jobscreatedfrom2 = /** @type {((inputs?: Logs_Jobscreatedfrom2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_Jobscreatedfrom2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_logs_jobscreatedfrom2(inputs)
	return en_logs_jobscreatedfrom2(inputs)
});
export { logs_jobscreatedfrom2 as "logs.jobsCreatedFrom" }