/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Logs_DurationInputs */

const en_logs_duration = /** @type {(inputs: Logs_DurationInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Duration`)
};

const id_logs_duration = /** @type {(inputs: Logs_DurationInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Durasi`)
};

/**
* | output |
* | --- |
* | "Duration" |
*
* @param {Logs_DurationInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_duration = /** @type {((inputs?: Logs_DurationInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_DurationInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_logs_duration(inputs)
	return en_logs_duration(inputs)
});
export { logs_duration as "logs.duration" }