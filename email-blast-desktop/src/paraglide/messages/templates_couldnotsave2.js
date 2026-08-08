/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Couldnotsave2Inputs */

const en_templates_couldnotsave2 = /** @type {(inputs: Templates_Couldnotsave2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not save the template.`)
};

const id_templates_couldnotsave2 = /** @type {(inputs: Templates_Couldnotsave2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gagal menyimpan template.`)
};

/**
* | output |
* | --- |
* | "Could not save the template." |
*
* @param {Templates_Couldnotsave2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_couldnotsave2 = /** @type {((inputs?: Templates_Couldnotsave2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Couldnotsave2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_couldnotsave2(inputs)
	return en_templates_couldnotsave2(inputs)
});
export { templates_couldnotsave2 as "templates.couldNotSave" }