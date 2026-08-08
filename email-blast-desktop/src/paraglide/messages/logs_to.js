/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Logs_ToInputs */

const en_logs_to = /** @type {(inputs: Logs_ToInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`To`)
};

const id_logs_to = /** @type {(inputs: Logs_ToInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sampai`)
};

/**
* | output |
* | --- |
* | "To" |
*
* @param {Logs_ToInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_to = /** @type {((inputs?: Logs_ToInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_ToInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_logs_to(inputs)
	return en_logs_to(inputs)
});
export { logs_to as "logs.to" }