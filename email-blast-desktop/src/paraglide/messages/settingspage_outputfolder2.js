/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Settingspage_Outputfolder2Inputs */

const en_settingspage_outputfolder2 = /** @type {(inputs: Settingspage_Outputfolder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Output folder`)
};

const id_settingspage_outputfolder2 = /** @type {(inputs: Settingspage_Outputfolder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Folder output`)
};

/**
* | output |
* | --- |
* | "Output folder" |
*
* @param {Settingspage_Outputfolder2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const settingspage_outputfolder2 = /** @type {((inputs?: Settingspage_Outputfolder2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settingspage_Outputfolder2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_settingspage_outputfolder2(inputs)
	return en_settingspage_outputfolder2(inputs)
});
export { settingspage_outputfolder2 as "settingsPage.outputFolder" }