/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Logs_Loadinglogs1Inputs */

const en_logs_loadinglogs1 = /** @type {(inputs: Logs_Loadinglogs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Loading logs…`)
};

const id_logs_loadinglogs1 = /** @type {(inputs: Logs_Loadinglogs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Memuat log…`)
};

/**
* | output |
* | --- |
* | "Loading logs…" |
*
* @param {Logs_Loadinglogs1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_loadinglogs1 = /** @type {((inputs?: Logs_Loadinglogs1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_Loadinglogs1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_logs_loadinglogs1(inputs)
	return en_logs_loadinglogs1(inputs)
});
export { logs_loadinglogs1 as "logs.loadingLogs" }