/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Settingspage_Defaultfolders2Inputs */

const en_settingspage_defaultfolders2 = /** @type {(inputs: Settingspage_Defaultfolders2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Default folders`)
};

const id_settingspage_defaultfolders2 = /** @type {(inputs: Settingspage_Defaultfolders2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Folder bawaan`)
};

/**
* | output |
* | --- |
* | "Default folders" |
*
* @param {Settingspage_Defaultfolders2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const settingspage_defaultfolders2 = /** @type {((inputs?: Settingspage_Defaultfolders2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settingspage_Defaultfolders2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_settingspage_defaultfolders2(inputs)
	return en_settingspage_defaultfolders2(inputs)
});
export { settingspage_defaultfolders2 as "settingsPage.defaultFolders" }