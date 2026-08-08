/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Thistemplate1Inputs */

const en_templates_thistemplate1 = /** @type {(inputs: Templates_Thistemplate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`this template`)
};

const id_templates_thistemplate1 = /** @type {(inputs: Templates_Thistemplate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`template ini`)
};

/**
* | output |
* | --- |
* | "this template" |
*
* @param {Templates_Thistemplate1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_thistemplate1 = /** @type {((inputs?: Templates_Thistemplate1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Thistemplate1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_thistemplate1(inputs)
	return en_templates_thistemplate1(inputs)
});
export { templates_thistemplate1 as "templates.thisTemplate" }