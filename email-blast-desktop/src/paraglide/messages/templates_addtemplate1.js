/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Addtemplate1Inputs */

const en_templates_addtemplate1 = /** @type {(inputs: Templates_Addtemplate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Add template`)
};

const id_templates_addtemplate1 = /** @type {(inputs: Templates_Addtemplate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tambah template`)
};

/**
* | output |
* | --- |
* | "Add template" |
*
* @param {Templates_Addtemplate1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_addtemplate1 = /** @type {((inputs?: Templates_Addtemplate1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Addtemplate1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_addtemplate1(inputs)
	return en_templates_addtemplate1(inputs)
});
export { templates_addtemplate1 as "templates.addTemplate" }