/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ message: NonNullable<unknown> }} Sendjob_Retriesexhausted2Inputs */

const en_sendjob_retriesexhausted2 = /** @type {(inputs: Sendjob_Retriesexhausted2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Retries exhausted: ${i?.message}`)
};

const id_sendjob_retriesexhausted2 = /** @type {(inputs: Sendjob_Retriesexhausted2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Percobaan ulang habis: ${i?.message}`)
};

/**
* | output |
* | --- |
* | "Retries exhausted: {message}" |
*
* @param {Sendjob_Retriesexhausted2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_retriesexhausted2 = /** @type {((inputs: Sendjob_Retriesexhausted2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Retriesexhausted2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_sendjob_retriesexhausted2(inputs)
	return en_sendjob_retriesexhausted2(inputs)
});
export { sendjob_retriesexhausted2 as "sendJob.retriesExhausted" }