/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Settingspage_Ratelimitingdescription3Inputs */

const en_settingspage_ratelimitingdescription3 = /** @type {(inputs: Settingspage_Ratelimitingdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The delay between each email while a send job runs.`)
};

const id_settingspage_ratelimitingdescription3 = /** @type {(inputs: Settingspage_Ratelimitingdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Jeda antara setiap email saat pekerjaan pengiriman berjalan.`)
};

/**
* | output |
* | --- |
* | "The delay between each email while a send job runs." |
*
* @param {Settingspage_Ratelimitingdescription3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const settingspage_ratelimitingdescription3 = /** @type {((inputs?: Settingspage_Ratelimitingdescription3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settingspage_Ratelimitingdescription3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_settingspage_ratelimitingdescription3(inputs)
	return en_settingspage_ratelimitingdescription3(inputs)
});
export { settingspage_ratelimitingdescription3 as "settingsPage.rateLimitingDescription" }