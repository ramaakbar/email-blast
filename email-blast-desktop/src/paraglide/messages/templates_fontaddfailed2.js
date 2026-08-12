/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Fontaddfailed2Inputs */

const en_templates_fontaddfailed2 = /** @type {(inputs: Templates_Fontaddfailed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not add the font file.`)
};

const id_templates_fontaddfailed2 = /** @type {(inputs: Templates_Fontaddfailed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gagal menambahkan file huruf.`)
};

/**
* | output |
* | --- |
* | "Could not add the font file." |
*
* @param {Templates_Fontaddfailed2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_fontaddfailed2 = /** @type {((inputs?: Templates_Fontaddfailed2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Fontaddfailed2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_fontaddfailed2(inputs)
	return en_templates_fontaddfailed2(inputs)
});
export { templates_fontaddfailed2 as "templates.fontAddFailed" }