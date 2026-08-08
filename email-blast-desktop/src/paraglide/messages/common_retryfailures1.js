/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Common_Retryfailures1Inputs */

const en_common_retryfailures1 = /** @type {(inputs: Common_Retryfailures1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Retry Failures`)
};

const id_common_retryfailures1 = /** @type {(inputs: Common_Retryfailures1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ulangi yang Gagal`)
};

/**
* | output |
* | --- |
* | "Retry Failures" |
*
* @param {Common_Retryfailures1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const common_retryfailures1 = /** @type {((inputs?: Common_Retryfailures1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Retryfailures1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_common_retryfailures1(inputs)
	return en_common_retryfailures1(inputs)
});
export { common_retryfailures1 as "common.retryFailures" }