/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Logs_Jobscreatedupto3Inputs */

const en_logs_jobscreatedupto3 = /** @type {(inputs: Logs_Jobscreatedupto3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Jobs created up to`)
};

const id_logs_jobscreatedupto3 = /** @type {(inputs: Logs_Jobscreatedupto3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pekerjaan dibuat sampai`)
};

/**
* | output |
* | --- |
* | "Jobs created up to" |
*
* @param {Logs_Jobscreatedupto3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_jobscreatedupto3 = /** @type {((inputs?: Logs_Jobscreatedupto3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_Jobscreatedupto3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_logs_jobscreatedupto3(inputs)
	return en_logs_jobscreatedupto3(inputs)
});
export { logs_jobscreatedupto3 as "logs.jobsCreatedUpTo" }