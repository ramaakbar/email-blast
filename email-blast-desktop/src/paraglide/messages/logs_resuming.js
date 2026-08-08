/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Logs_ResumingInputs */

const en_logs_resuming = /** @type {(inputs: Logs_ResumingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Resuming…`)
};

const id_logs_resuming = /** @type {(inputs: Logs_ResumingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Melanjutkan…`)
};

/**
* | output |
* | --- |
* | "Resuming…" |
*
* @param {Logs_ResumingInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_resuming = /** @type {((inputs?: Logs_ResumingInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_ResumingInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_logs_resuming(inputs)
	return en_logs_resuming(inputs)
});
export { logs_resuming as "logs.resuming" }