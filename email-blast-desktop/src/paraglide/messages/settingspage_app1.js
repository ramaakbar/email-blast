/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Settingspage_App1Inputs */

const en_settingspage_app1 = /** @type {(inputs: Settingspage_App1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`App`)
};

const id_settingspage_app1 = /** @type {(inputs: Settingspage_App1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Aplikasi`)
};

/**
* | output |
* | --- |
* | "App" |
*
* @param {Settingspage_App1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const settingspage_app1 = /** @type {((inputs?: Settingspage_App1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settingspage_App1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_settingspage_app1(inputs)
	return en_settingspage_app1(inputs)
});
export { settingspage_app1 as "settingsPage.app" }