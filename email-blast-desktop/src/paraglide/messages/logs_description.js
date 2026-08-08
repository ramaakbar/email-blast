/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Logs_DescriptionInputs */

const en_logs_description = /** @type {(inputs: Logs_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Every send job, most recent first - open one for the per-recipient detail.`)
};

const id_logs_description = /** @type {(inputs: Logs_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Setiap pekerjaan pengiriman, terbaru dulu - buka satu untuk detail per penerima.`)
};

/**
* | output |
* | --- |
* | "Every send job, most recent first - open one for the per-recipient detail." |
*
* @param {Logs_DescriptionInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_description = /** @type {((inputs?: Logs_DescriptionInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_DescriptionInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_logs_description(inputs)
	return en_logs_description(inputs)
});
export { logs_description as "logs.description" }