/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Logs_Couldnotload2Inputs */

const en_logs_couldnotload2 = /** @type {(inputs: Logs_Couldnotload2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not load the logs.`)
};

const id_logs_couldnotload2 = /** @type {(inputs: Logs_Couldnotload2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gagal memuat log.`)
};

/**
* | output |
* | --- |
* | "Could not load the logs." |
*
* @param {Logs_Couldnotload2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_couldnotload2 = /** @type {((inputs?: Logs_Couldnotload2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_Couldnotload2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_logs_couldnotload2(inputs)
	return en_logs_couldnotload2(inputs)
});
export { logs_couldnotload2 as "logs.couldNotLoad" }