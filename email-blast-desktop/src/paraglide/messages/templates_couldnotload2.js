/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Couldnotload2Inputs */

const en_templates_couldnotload2 = /** @type {(inputs: Templates_Couldnotload2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not load templates.`)
};

const id_templates_couldnotload2 = /** @type {(inputs: Templates_Couldnotload2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gagal memuat template.`)
};

/**
* | output |
* | --- |
* | "Could not load templates." |
*
* @param {Templates_Couldnotload2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_couldnotload2 = /** @type {((inputs?: Templates_Couldnotload2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Couldnotload2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_couldnotload2(inputs)
	return en_templates_couldnotload2(inputs)
});
export { templates_couldnotload2 as "templates.couldNotLoad" }