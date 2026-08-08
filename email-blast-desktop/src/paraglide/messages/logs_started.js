/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Logs_StartedInputs */

const en_logs_started = /** @type {(inputs: Logs_StartedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Started`)
};

const id_logs_started = /** @type {(inputs: Logs_StartedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dimulai`)
};

/**
* | output |
* | --- |
* | "Started" |
*
* @param {Logs_StartedInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_started = /** @type {((inputs?: Logs_StartedInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_StartedInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_logs_started(inputs)
	return en_logs_started(inputs)
});
export { logs_started as "logs.started" }