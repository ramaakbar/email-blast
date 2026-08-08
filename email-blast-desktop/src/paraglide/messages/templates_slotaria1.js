/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ index: NonNullable<unknown> }} Templates_Slotaria1Inputs */

const en_templates_slotaria1 = /** @type {(inputs: Templates_Slotaria1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Slot ${i?.index}`)
};

const id_templates_slotaria1 = /** @type {(inputs: Templates_Slotaria1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Slot ${i?.index}`)
};

/**
* | output |
* | --- |
* | "Slot {index}" |
*
* @param {Templates_Slotaria1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_slotaria1 = /** @type {((inputs: Templates_Slotaria1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Slotaria1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_slotaria1(inputs)
	return en_templates_slotaria1(inputs)
});
export { templates_slotaria1 as "templates.slotAria" }