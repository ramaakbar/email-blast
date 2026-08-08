/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Logs_Sentfailedskipped2Inputs */

const en_logs_sentfailedskipped2 = /** @type {(inputs: Logs_Sentfailedskipped2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sent / Failed / Skipped`)
};

const id_logs_sentfailedskipped2 = /** @type {(inputs: Logs_Sentfailedskipped2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Terkirim / Gagal / Dilewati`)
};

/**
* | output |
* | --- |
* | "Sent / Failed / Skipped" |
*
* @param {Logs_Sentfailedskipped2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_sentfailedskipped2 = /** @type {((inputs?: Logs_Sentfailedskipped2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_Sentfailedskipped2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_logs_sentfailedskipped2(inputs)
	return en_logs_sentfailedskipped2(inputs)
});
export { logs_sentfailedskipped2 as "logs.sentFailedSkipped" }