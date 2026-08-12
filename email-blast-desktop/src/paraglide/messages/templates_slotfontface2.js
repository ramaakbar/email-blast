/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Slotfontface2Inputs */

const en_templates_slotfontface2 = /** @type {(inputs: Templates_Slotfontface2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Font face`)
};

const id_templates_slotfontface2 = /** @type {(inputs: Templates_Slotfontface2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Jenis huruf`)
};

/**
* | output |
* | --- |
* | "Font face" |
*
* @param {Templates_Slotfontface2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_slotfontface2 = /** @type {((inputs?: Templates_Slotfontface2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Slotfontface2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_slotfontface2(inputs)
	return en_templates_slotfontface2(inputs)
});
export { templates_slotfontface2 as "templates.slotFontFace" }