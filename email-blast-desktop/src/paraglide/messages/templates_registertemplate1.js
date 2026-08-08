/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Registertemplate1Inputs */

const en_templates_registertemplate1 = /** @type {(inputs: Templates_Registertemplate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Register template`)
};

const id_templates_registertemplate1 = /** @type {(inputs: Templates_Registertemplate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Daftarkan template`)
};

/**
* | output |
* | --- |
* | "Register template" |
*
* @param {Templates_Registertemplate1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_registertemplate1 = /** @type {((inputs?: Templates_Registertemplate1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Registertemplate1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_registertemplate1(inputs)
	return en_templates_registertemplate1(inputs)
});
export { templates_registertemplate1 as "templates.registerTemplate" }