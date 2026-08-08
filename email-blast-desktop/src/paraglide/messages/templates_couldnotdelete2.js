/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Couldnotdelete2Inputs */

const en_templates_couldnotdelete2 = /** @type {(inputs: Templates_Couldnotdelete2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not delete the template.`)
};

const id_templates_couldnotdelete2 = /** @type {(inputs: Templates_Couldnotdelete2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gagal menghapus template.`)
};

/**
* | output |
* | --- |
* | "Could not delete the template." |
*
* @param {Templates_Couldnotdelete2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_couldnotdelete2 = /** @type {((inputs?: Templates_Couldnotdelete2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Couldnotdelete2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_couldnotdelete2(inputs)
	return en_templates_couldnotdelete2(inputs)
});
export { templates_couldnotdelete2 as "templates.couldNotDelete" }