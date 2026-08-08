/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Nav_LogsInputs */

const en_nav_logs = /** @type {(inputs: Nav_LogsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Logs`)
};

const id_nav_logs = /** @type {(inputs: Nav_LogsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Log`)
};

/**
* | output |
* | --- |
* | "Logs" |
*
* @param {Nav_LogsInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const nav_logs = /** @type {((inputs?: Nav_LogsInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_LogsInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_nav_logs(inputs)
	return en_nav_logs(inputs)
});
export { nav_logs as "nav.logs" }