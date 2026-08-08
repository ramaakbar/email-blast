/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Templatename1Inputs */

const en_templates_templatename1 = /** @type {(inputs: Templates_Templatename1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Template name`)
};

const id_templates_templatename1 = /** @type {(inputs: Templates_Templatename1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nama template`)
};

/**
* | output |
* | --- |
* | "Template name" |
*
* @param {Templates_Templatename1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_templatename1 = /** @type {((inputs?: Templates_Templatename1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Templatename1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_templatename1(inputs)
	return en_templates_templatename1(inputs)
});
export { templates_templatename1 as "templates.templateName" }