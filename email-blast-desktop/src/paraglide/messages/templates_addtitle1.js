/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Addtitle1Inputs */

const en_templates_addtitle1 = /** @type {(inputs: Templates_Addtitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Add template`)
};

const id_templates_addtitle1 = /** @type {(inputs: Templates_Addtitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tambah template`)
};

/**
* | output |
* | --- |
* | "Add template" |
*
* @param {Templates_Addtitle1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_addtitle1 = /** @type {((inputs?: Templates_Addtitle1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Addtitle1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_addtitle1(inputs)
	return en_templates_addtitle1(inputs)
});
export { templates_addtitle1 as "templates.addTitle" }