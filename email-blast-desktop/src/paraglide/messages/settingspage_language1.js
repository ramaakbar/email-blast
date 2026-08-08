/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Settingspage_Language1Inputs */

const en_settingspage_language1 = /** @type {(inputs: Settingspage_Language1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Language`)
};

const id_settingspage_language1 = /** @type {(inputs: Settingspage_Language1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bahasa`)
};

/**
* | output |
* | --- |
* | "Language" |
*
* @param {Settingspage_Language1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const settingspage_language1 = /** @type {((inputs?: Settingspage_Language1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settingspage_Language1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_settingspage_language1(inputs)
	return en_settingspage_language1(inputs)
});
export { settingspage_language1 as "settingsPage.language" }