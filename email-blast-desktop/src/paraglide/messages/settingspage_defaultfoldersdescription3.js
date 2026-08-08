/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Settingspage_Defaultfoldersdescription3Inputs */

const en_settingspage_defaultfoldersdescription3 = /** @type {(inputs: Settingspage_Defaultfoldersdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Where templates live and where generated PDFs are written. The app creates them when missing.`)
};

const id_settingspage_defaultfoldersdescription3 = /** @type {(inputs: Settingspage_Defaultfoldersdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tempat template disimpan dan PDF hasil generate ditulis. Aplikasi membuatnya jika belum ada.`)
};

/**
* | output |
* | --- |
* | "Where templates live and where generated PDFs are written. The app creates them when missing." |
*
* @param {Settingspage_Defaultfoldersdescription3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const settingspage_defaultfoldersdescription3 = /** @type {((inputs?: Settingspage_Defaultfoldersdescription3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settingspage_Defaultfoldersdescription3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_settingspage_defaultfoldersdescription3(inputs)
	return en_settingspage_defaultfoldersdescription3(inputs)
});
export { settingspage_defaultfoldersdescription3 as "settingsPage.defaultFoldersDescription" }