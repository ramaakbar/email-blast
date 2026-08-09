/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Slotcolor1Inputs */

const en_templates_slotcolor1 = /** @type {(inputs: Templates_Slotcolor1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Color`)
};

const id_templates_slotcolor1 = /** @type {(inputs: Templates_Slotcolor1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Warna`)
};

/**
* | output |
* | --- |
* | "Color" |
*
* @param {Templates_Slotcolor1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_slotcolor1 = /** @type {((inputs?: Templates_Slotcolor1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Slotcolor1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_slotcolor1(inputs)
	return en_templates_slotcolor1(inputs)
});
export { templates_slotcolor1 as "templates.slotColor" }