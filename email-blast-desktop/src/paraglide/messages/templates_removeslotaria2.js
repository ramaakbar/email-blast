/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ index: NonNullable<unknown> }} Templates_Removeslotaria2Inputs */

const en_templates_removeslotaria2 = /** @type {(inputs: Templates_Removeslotaria2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Remove slot ${i?.index}`)
};

const id_templates_removeslotaria2 = /** @type {(inputs: Templates_Removeslotaria2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Hapus slot ${i?.index}`)
};

/**
* | output |
* | --- |
* | "Remove slot {index}" |
*
* @param {Templates_Removeslotaria2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_removeslotaria2 = /** @type {((inputs: Templates_Removeslotaria2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Removeslotaria2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_removeslotaria2(inputs)
	return en_templates_removeslotaria2(inputs)
});
export { templates_removeslotaria2 as "templates.removeSlotAria" }