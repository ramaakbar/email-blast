/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Logs_FromInputs */

const en_logs_from = /** @type {(inputs: Logs_FromInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`From`)
};

const id_logs_from = /** @type {(inputs: Logs_FromInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dari`)
};

/**
* | output |
* | --- |
* | "From" |
*
* @param {Logs_FromInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_from = /** @type {((inputs?: Logs_FromInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_FromInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_logs_from(inputs)
	return en_logs_from(inputs)
});
export { logs_from as "logs.from" }