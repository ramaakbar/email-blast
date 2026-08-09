/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Sloty1Inputs */

const en_templates_sloty1 = /** @type {(inputs: Templates_Sloty1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Y`)
};

const id_templates_sloty1 = /** @type {(inputs: Templates_Sloty1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Y`)
};

/**
* | output |
* | --- |
* | "Y" |
*
* @param {Templates_Sloty1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_sloty1 = /** @type {((inputs?: Templates_Sloty1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Sloty1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_sloty1(inputs)
	return en_templates_sloty1(inputs)
});
export { templates_sloty1 as "templates.slotY" }