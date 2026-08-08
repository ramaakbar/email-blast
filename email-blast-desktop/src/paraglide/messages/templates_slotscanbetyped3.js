/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Slotscanbetyped3Inputs */

const en_templates_slotscanbetyped3 = /** @type {(inputs: Templates_Slotscanbetyped3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Slots can be typed below instead.`)
};

const id_templates_slotscanbetyped3 = /** @type {(inputs: Templates_Slotscanbetyped3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Slot bisa diketik manual di bawah.`)
};

/**
* | output |
* | --- |
* | "Slots can be typed below instead." |
*
* @param {Templates_Slotscanbetyped3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_slotscanbetyped3 = /** @type {((inputs?: Templates_Slotscanbetyped3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Slotscanbetyped3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_slotscanbetyped3(inputs)
	return en_templates_slotscanbetyped3(inputs)
});
export { templates_slotscanbetyped3 as "templates.slotsCanBeTyped" }