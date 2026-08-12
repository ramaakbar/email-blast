/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Dialogs_Fontfilter1Inputs */

const en_dialogs_fontfilter1 = /** @type {(inputs: Dialogs_Fontfilter1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Font`)
};

const id_dialogs_fontfilter1 = /** @type {(inputs: Dialogs_Fontfilter1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Font`)
};

/**
* | output |
* | --- |
* | "Font" |
*
* @param {Dialogs_Fontfilter1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const dialogs_fontfilter1 = /** @type {((inputs?: Dialogs_Fontfilter1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Dialogs_Fontfilter1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_dialogs_fontfilter1(inputs)
	return en_dialogs_fontfilter1(inputs)
});
export { dialogs_fontfilter1 as "dialogs.fontFilter" }