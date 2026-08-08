/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Logs_Filterbystatus2Inputs */

const en_logs_filterbystatus2 = /** @type {(inputs: Logs_Filterbystatus2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Filter by status`)
};

const id_logs_filterbystatus2 = /** @type {(inputs: Logs_Filterbystatus2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Saring berdasarkan status`)
};

/**
* | output |
* | --- |
* | "Filter by status" |
*
* @param {Logs_Filterbystatus2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_filterbystatus2 = /** @type {((inputs?: Logs_Filterbystatus2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_Filterbystatus2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_logs_filterbystatus2(inputs)
	return en_logs_filterbystatus2(inputs)
});
export { logs_filterbystatus2 as "logs.filterByStatus" }