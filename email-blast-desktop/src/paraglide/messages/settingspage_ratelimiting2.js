/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Settingspage_Ratelimiting2Inputs */

const en_settingspage_ratelimiting2 = /** @type {(inputs: Settingspage_Ratelimiting2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rate limiting`)
};

const id_settingspage_ratelimiting2 = /** @type {(inputs: Settingspage_Ratelimiting2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pembatasan kecepatan`)
};

/**
* | output |
* | --- |
* | "Rate limiting" |
*
* @param {Settingspage_Ratelimiting2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const settingspage_ratelimiting2 = /** @type {((inputs?: Settingspage_Ratelimiting2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settingspage_Ratelimiting2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_settingspage_ratelimiting2(inputs)
	return en_settingspage_ratelimiting2(inputs)
});
export { settingspage_ratelimiting2 as "settingsPage.rateLimiting" }