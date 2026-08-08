/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Notemplatesyet2Inputs */

const en_templates_notemplatesyet2 = /** @type {(inputs: Templates_Notemplatesyet2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No templates yet`)
};

const id_templates_notemplatesyet2 = /** @type {(inputs: Templates_Notemplatesyet2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Belum ada template`)
};

/**
* | output |
* | --- |
* | "No templates yet" |
*
* @param {Templates_Notemplatesyet2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_notemplatesyet2 = /** @type {((inputs?: Templates_Notemplatesyet2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Notemplatesyet2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_notemplatesyet2(inputs)
	return en_templates_notemplatesyet2(inputs)
});
export { templates_notemplatesyet2 as "templates.noTemplatesYet" }