/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Settingspage_Description1Inputs */

const en_settingspage_description1 = /** @type {(inputs: Settingspage_Description1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SMTP profiles, sending rate, default folders, and app information.`)
};

const id_settingspage_description1 = /** @type {(inputs: Settingspage_Description1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Profil SMTP, kecepatan pengiriman, folder bawaan, dan informasi aplikasi.`)
};

/**
* | output |
* | --- |
* | "SMTP profiles, sending rate, default folders, and app information." |
*
* @param {Settingspage_Description1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const settingspage_description1 = /** @type {((inputs?: Settingspage_Description1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settingspage_Description1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_settingspage_description1(inputs)
	return en_settingspage_description1(inputs)
});
export { settingspage_description1 as "settingsPage.description" }