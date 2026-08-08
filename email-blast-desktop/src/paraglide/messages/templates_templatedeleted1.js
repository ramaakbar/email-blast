/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Templatedeleted1Inputs */

const en_templates_templatedeleted1 = /** @type {(inputs: Templates_Templatedeleted1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Template deleted.`)
};

const id_templates_templatedeleted1 = /** @type {(inputs: Templates_Templatedeleted1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Template dihapus.`)
};

/**
* | output |
* | --- |
* | "Template deleted." |
*
* @param {Templates_Templatedeleted1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_templatedeleted1 = /** @type {((inputs?: Templates_Templatedeleted1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Templatedeleted1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_templatedeleted1(inputs)
	return en_templates_templatedeleted1(inputs)
});
export { templates_templatedeleted1 as "templates.templateDeleted" }