/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Templates_Templateregistered1Inputs */

const en_templates_templateregistered1 = /** @type {(inputs: Templates_Templateregistered1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Template "${i?.name}" registered.`)
};

const id_templates_templateregistered1 = /** @type {(inputs: Templates_Templateregistered1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Template "${i?.name}" terdaftar.`)
};

/**
* | output |
* | --- |
* | "Template \"{name}\" registered." |
*
* @param {Templates_Templateregistered1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_templateregistered1 = /** @type {((inputs: Templates_Templateregistered1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Templateregistered1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_templateregistered1(inputs)
	return en_templates_templateregistered1(inputs)
});
export { templates_templateregistered1 as "templates.templateRegistered" }