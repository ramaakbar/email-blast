/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Couldnotregister2Inputs */

const en_templates_couldnotregister2 = /** @type {(inputs: Templates_Couldnotregister2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not register the template.`)
};

const id_templates_couldnotregister2 = /** @type {(inputs: Templates_Couldnotregister2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gagal mendaftarkan template.`)
};

/**
* | output |
* | --- |
* | "Could not register the template." |
*
* @param {Templates_Couldnotregister2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_couldnotregister2 = /** @type {((inputs?: Templates_Couldnotregister2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Couldnotregister2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_couldnotregister2(inputs)
	return en_templates_couldnotregister2(inputs)
});
export { templates_couldnotregister2 as "templates.couldNotRegister" }