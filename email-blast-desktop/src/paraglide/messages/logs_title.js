/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Logs_TitleInputs */

const en_logs_title = /** @type {(inputs: Logs_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Logs`)
};

const id_logs_title = /** @type {(inputs: Logs_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Log`)
};

/**
* | output |
* | --- |
* | "Logs" |
*
* @param {Logs_TitleInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_title = /** @type {((inputs?: Logs_TitleInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_TitleInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_logs_title(inputs)
	return en_logs_title(inputs)
});
export { logs_title as "logs.title" }