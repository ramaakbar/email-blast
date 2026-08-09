/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Slotx1Inputs */

const en_templates_slotx1 = /** @type {(inputs: Templates_Slotx1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`X`)
};

const id_templates_slotx1 = /** @type {(inputs: Templates_Slotx1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`X`)
};

/**
* | output |
* | --- |
* | "X" |
*
* @param {Templates_Slotx1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_slotx1 = /** @type {((inputs?: Templates_Slotx1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Slotx1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_slotx1(inputs)
	return en_templates_slotx1(inputs)
});
export { templates_slotx1 as "templates.slotX" }