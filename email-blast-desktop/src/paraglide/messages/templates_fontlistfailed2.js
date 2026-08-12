/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Fontlistfailed2Inputs */

const en_templates_fontlistfailed2 = /** @type {(inputs: Templates_Fontlistfailed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not load the available fonts.`)
};

const id_templates_fontlistfailed2 = /** @type {(inputs: Templates_Fontlistfailed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gagal memuat huruf yang tersedia.`)
};

/**
* | output |
* | --- |
* | "Could not load the available fonts." |
*
* @param {Templates_Fontlistfailed2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_fontlistfailed2 = /** @type {((inputs?: Templates_Fontlistfailed2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Fontlistfailed2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_fontlistfailed2(inputs)
	return en_templates_fontlistfailed2(inputs)
});
export { templates_fontlistfailed2 as "templates.fontListFailed" }