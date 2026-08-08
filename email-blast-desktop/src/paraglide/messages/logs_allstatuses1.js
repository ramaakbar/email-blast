/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Logs_Allstatuses1Inputs */

const en_logs_allstatuses1 = /** @type {(inputs: Logs_Allstatuses1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`All statuses`)
};

const id_logs_allstatuses1 = /** @type {(inputs: Logs_Allstatuses1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Semua status`)
};

/**
* | output |
* | --- |
* | "All statuses" |
*
* @param {Logs_Allstatuses1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const logs_allstatuses1 = /** @type {((inputs?: Logs_Allstatuses1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Logs_Allstatuses1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_logs_allstatuses1(inputs)
	return en_logs_allstatuses1(inputs)
});
export { logs_allstatuses1 as "logs.allStatuses" }