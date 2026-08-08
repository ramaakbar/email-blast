/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Settingspage_Languagedescription2Inputs */

const en_settingspage_languagedescription2 = /** @type {(inputs: Settingspage_Languagedescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The language the app interface is shown in.`)
};

const id_settingspage_languagedescription2 = /** @type {(inputs: Settingspage_Languagedescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bahasa yang dipakai untuk tampilan aplikasi.`)
};

/**
* | output |
* | --- |
* | "The language the app interface is shown in." |
*
* @param {Settingspage_Languagedescription2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const settingspage_languagedescription2 = /** @type {((inputs?: Settingspage_Languagedescription2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settingspage_Languagedescription2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_settingspage_languagedescription2(inputs)
	return en_settingspage_languagedescription2(inputs)
});
export { settingspage_languagedescription2 as "settingsPage.languageDescription" }