/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Slotalignright2Inputs */

const en_templates_slotalignright2 = /** @type {(inputs: Templates_Slotalignright2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Align right`)
};

const id_templates_slotalignright2 = /** @type {(inputs: Templates_Slotalignright2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rata kanan`)
};

/**
* | output |
* | --- |
* | "Align right" |
*
* @param {Templates_Slotalignright2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_slotalignright2 = /** @type {((inputs?: Templates_Slotalignright2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Slotalignright2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_slotalignright2(inputs)
	return en_templates_slotalignright2(inputs)
});
export { templates_slotalignright2 as "templates.slotAlignRight" }