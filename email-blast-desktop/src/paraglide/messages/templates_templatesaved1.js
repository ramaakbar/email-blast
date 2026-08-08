/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Templates_Templatesaved1Inputs */

const en_templates_templatesaved1 = /** @type {(inputs: Templates_Templatesaved1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Template "${i?.name}" saved.`)
};

const id_templates_templatesaved1 = /** @type {(inputs: Templates_Templatesaved1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Template "${i?.name}" tersimpan.`)
};

/**
* | output |
* | --- |
* | "Template \"{name}\" saved." |
*
* @param {Templates_Templatesaved1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_templatesaved1 = /** @type {((inputs: Templates_Templatesaved1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Templatesaved1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_templatesaved1(inputs)
	return en_templates_templatesaved1(inputs)
});
export { templates_templatesaved1 as "templates.templateSaved" }