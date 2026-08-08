/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Couldnotscan2Inputs */

const en_templates_couldnotscan2 = /** @type {(inputs: Templates_Couldnotscan2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not scan the template for slots.`)
};

const id_templates_couldnotscan2 = /** @type {(inputs: Templates_Couldnotscan2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gagal memindai template untuk slot.`)
};

/**
* | output |
* | --- |
* | "Could not scan the template for slots." |
*
* @param {Templates_Couldnotscan2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_couldnotscan2 = /** @type {((inputs?: Templates_Couldnotscan2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Couldnotscan2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_couldnotscan2(inputs)
	return en_templates_couldnotscan2(inputs)
});
export { templates_couldnotscan2 as "templates.couldNotScan" }