/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Settingspage_Version1Inputs */

const en_settingspage_version1 = /** @type {(inputs: Settingspage_Version1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Version`)
};

const id_settingspage_version1 = /** @type {(inputs: Settingspage_Version1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Versi`)
};

/**
* | output |
* | --- |
* | "Version" |
*
* @param {Settingspage_Version1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const settingspage_version1 = /** @type {((inputs?: Settingspage_Version1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settingspage_Version1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_settingspage_version1(inputs)
	return en_settingspage_version1(inputs)
});
export { settingspage_version1 as "settingsPage.version" }