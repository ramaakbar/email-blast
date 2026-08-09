/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Slotfontsize2Inputs */

const en_templates_slotfontsize2 = /** @type {(inputs: Templates_Slotfontsize2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Font size`)
};

const id_templates_slotfontsize2 = /** @type {(inputs: Templates_Slotfontsize2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ukuran huruf`)
};

/**
* | output |
* | --- |
* | "Font size" |
*
* @param {Templates_Slotfontsize2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_slotfontsize2 = /** @type {((inputs?: Templates_Slotfontsize2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Slotfontsize2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_slotfontsize2(inputs)
	return en_templates_slotfontsize2(inputs)
});
export { templates_slotfontsize2 as "templates.slotFontSize" }