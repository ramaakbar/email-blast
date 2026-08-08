/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Replaceslots1Inputs */

const en_templates_replaceslots1 = /** @type {(inputs: Templates_Replaceslots1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Replace slots`)
};

const id_templates_replaceslots1 = /** @type {(inputs: Templates_Replaceslots1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ganti slot`)
};

/**
* | output |
* | --- |
* | "Replace slots" |
*
* @param {Templates_Replaceslots1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_replaceslots1 = /** @type {((inputs?: Templates_Replaceslots1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Replaceslots1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_replaceslots1(inputs)
	return en_templates_replaceslots1(inputs)
});
export { templates_replaceslots1 as "templates.replaceSlots" }