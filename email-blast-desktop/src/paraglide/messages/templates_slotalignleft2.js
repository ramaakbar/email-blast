/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Slotalignleft2Inputs */

const en_templates_slotalignleft2 = /** @type {(inputs: Templates_Slotalignleft2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Align left`)
};

const id_templates_slotalignleft2 = /** @type {(inputs: Templates_Slotalignleft2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rata kiri`)
};

/**
* | output |
* | --- |
* | "Align left" |
*
* @param {Templates_Slotalignleft2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_slotalignleft2 = /** @type {((inputs?: Templates_Slotalignleft2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Slotalignleft2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_slotalignleft2(inputs)
	return en_templates_slotalignleft2(inputs)
});
export { templates_slotalignleft2 as "templates.slotAlignLeft" }