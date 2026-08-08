/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Logs_Nosendjobsyet3Inputs */

const en_logs_nosendjobsyet3 = /** @type {(inputs: Logs_Nosendjobsyet3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No send jobs yet`)
};

const id_logs_nosendjobsyet3 = /** @type {(inputs: Logs_Nosendjobsyet3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Belum ada pekerjaan pengiriman`)
};

/**
* | output |
* | --- |
* | "No send jobs yet" |
*
* @param {Logs_Nosendjobsyet3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_nosendjobsyet3 = /** @type {((inputs?: Logs_Nosendjobsyet3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_Nosendjobsyet3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_logs_nosendjobsyet3(inputs)
	return en_logs_nosendjobsyet3(inputs)
});
export { logs_nosendjobsyet3 as "logs.noSendJobsYet" }