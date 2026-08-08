/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Loadingtemplates1Inputs */

const en_templates_loadingtemplates1 = /** @type {(inputs: Templates_Loadingtemplates1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Loading templates…`)
};

const id_templates_loadingtemplates1 = /** @type {(inputs: Templates_Loadingtemplates1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Memuat template…`)
};

/**
* | output |
* | --- |
* | "Loading templates…" |
*
* @param {Templates_Loadingtemplates1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_loadingtemplates1 = /** @type {((inputs?: Templates_Loadingtemplates1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Loadingtemplates1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_loadingtemplates1(inputs)
	return en_templates_loadingtemplates1(inputs)
});
export { templates_loadingtemplates1 as "templates.loadingTemplates" }