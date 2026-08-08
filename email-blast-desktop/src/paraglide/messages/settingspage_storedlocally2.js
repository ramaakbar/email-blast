/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Settingspage_Storedlocally2Inputs */

const en_settingspage_storedlocally2 = /** @type {(inputs: Settingspage_Storedlocally2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stored locally on this machine`)
};

const id_settingspage_storedlocally2 = /** @type {(inputs: Settingspage_Storedlocally2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tersimpan secara lokal di mesin ini`)
};

/**
* | output |
* | --- |
* | "Stored locally on this machine" |
*
* @param {Settingspage_Storedlocally2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const settingspage_storedlocally2 = /** @type {((inputs?: Settingspage_Storedlocally2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settingspage_Storedlocally2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_settingspage_storedlocally2(inputs)
	return en_settingspage_storedlocally2(inputs)
});
export { settingspage_storedlocally2 as "settingsPage.storedLocally" }