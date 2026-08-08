/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Settingspage_About1Inputs */

const en_settingspage_about1 = /** @type {(inputs: Settingspage_About1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`About`)
};

const id_settingspage_about1 = /** @type {(inputs: Settingspage_About1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tentang`)
};

/**
* | output |
* | --- |
* | "About" |
*
* @param {Settingspage_About1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const settingspage_about1 = /** @type {((inputs?: Settingspage_About1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settingspage_About1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_settingspage_about1(inputs)
	return en_settingspage_about1(inputs)
});
export { settingspage_about1 as "settingsPage.about" }