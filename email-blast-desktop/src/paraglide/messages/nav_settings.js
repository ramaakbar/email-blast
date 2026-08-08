/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Nav_SettingsInputs */

const en_nav_settings = /** @type {(inputs: Nav_SettingsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Settings`)
};

const id_nav_settings = /** @type {(inputs: Nav_SettingsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pengaturan`)
};

/**
* | output |
* | --- |
* | "Settings" |
*
* @param {Nav_SettingsInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const nav_settings = /** @type {((inputs?: Nav_SettingsInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_SettingsInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_nav_settings(inputs)
	return en_nav_settings(inputs)
});
export { nav_settings as "nav.settings" }