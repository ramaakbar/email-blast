/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Logs_Nojobshint2Inputs */

const en_logs_nojobshint2 = /** @type {(inputs: Logs_Nojobshint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Try a different status or date range.`)
};

const id_logs_nojobshint2 = /** @type {(inputs: Logs_Nojobshint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Coba status atau rentang tanggal lain.`)
};

/**
* | output |
* | --- |
* | "Try a different status or date range." |
*
* @param {Logs_Nojobshint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_nojobshint2 = /** @type {((inputs?: Logs_Nojobshint2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_Nojobshint2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_logs_nojobshint2(inputs)
	return en_logs_nojobshint2(inputs)
});
export { logs_nojobshint2 as "logs.noJobsHint" }