/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Slotaligncenter2Inputs */

const en_templates_slotaligncenter2 = /** @type {(inputs: Templates_Slotaligncenter2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Align center`)
};

const id_templates_slotaligncenter2 = /** @type {(inputs: Templates_Slotaligncenter2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rata tengah`)
};

/**
* | output |
* | --- |
* | "Align center" |
*
* @param {Templates_Slotaligncenter2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_slotaligncenter2 = /** @type {((inputs?: Templates_Slotaligncenter2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Slotaligncenter2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_slotaligncenter2(inputs)
	return en_templates_slotaligncenter2(inputs)
});
export { templates_slotaligncenter2 as "templates.slotAlignCenter" }