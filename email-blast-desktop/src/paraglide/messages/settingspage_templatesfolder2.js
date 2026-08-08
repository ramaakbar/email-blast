/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Settingspage_Templatesfolder2Inputs */

const en_settingspage_templatesfolder2 = /** @type {(inputs: Settingspage_Templatesfolder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Templates folder`)
};

const id_settingspage_templatesfolder2 = /** @type {(inputs: Settingspage_Templatesfolder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Folder template`)
};

/**
* | output |
* | --- |
* | "Templates folder" |
*
* @param {Settingspage_Templatesfolder2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const settingspage_templatesfolder2 = /** @type {((inputs?: Settingspage_Templatesfolder2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settingspage_Templatesfolder2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_settingspage_templatesfolder2(inputs)
	return en_settingspage_templatesfolder2(inputs)
});
export { settingspage_templatesfolder2 as "settingsPage.templatesFolder" }