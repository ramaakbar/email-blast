/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Settingspage_Couldnotload3Inputs */

const en_settingspage_couldnotload3 = /** @type {(inputs: Settingspage_Couldnotload3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not load settings.`)
};

const id_settingspage_couldnotload3 = /** @type {(inputs: Settingspage_Couldnotload3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gagal memuat pengaturan.`)
};

/**
* | output |
* | --- |
* | "Could not load settings." |
*
* @param {Settingspage_Couldnotload3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const settingspage_couldnotload3 = /** @type {((inputs?: Settingspage_Couldnotload3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settingspage_Couldnotload3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_settingspage_couldnotload3(inputs)
	return en_settingspage_couldnotload3(inputs)
});
export { settingspage_couldnotload3 as "settingsPage.couldNotLoad" }