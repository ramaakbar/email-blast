/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Settingspage_Title1Inputs */

const en_settingspage_title1 = /** @type {(inputs: Settingspage_Title1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Settings`)
};

const id_settingspage_title1 = /** @type {(inputs: Settingspage_Title1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pengaturan`)
};

/**
* | output |
* | --- |
* | "Settings" |
*
* @param {Settingspage_Title1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const settingspage_title1 = /** @type {((inputs?: Settingspage_Title1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settingspage_Title1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_settingspage_title1(inputs)
	return en_settingspage_title1(inputs)
});
export { settingspage_title1 as "settingsPage.title" }