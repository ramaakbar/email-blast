/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Slotfontfacedefault3Inputs */

const en_templates_slotfontfacedefault3 = /** @type {(inputs: Templates_Slotfontfacedefault3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Default (Helvetica Bold)`)
};

const id_templates_slotfontfacedefault3 = /** @type {(inputs: Templates_Slotfontfacedefault3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bawaan (Helvetica Bold)`)
};

/**
* | output |
* | --- |
* | "Default (Helvetica Bold)" |
*
* @param {Templates_Slotfontfacedefault3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_slotfontfacedefault3 = /** @type {((inputs?: Templates_Slotfontfacedefault3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Slotfontfacedefault3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_slotfontfacedefault3(inputs)
	return en_templates_slotfontfacedefault3(inputs)
});
export { templates_slotfontfacedefault3 as "templates.slotFontFaceDefault" }