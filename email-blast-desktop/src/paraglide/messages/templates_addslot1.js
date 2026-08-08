/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Addslot1Inputs */

const en_templates_addslot1 = /** @type {(inputs: Templates_Addslot1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Add slot`)
};

const id_templates_addslot1 = /** @type {(inputs: Templates_Addslot1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tambah slot`)
};

/**
* | output |
* | --- |
* | "Add slot" |
*
* @param {Templates_Addslot1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_addslot1 = /** @type {((inputs?: Templates_Addslot1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Addslot1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_addslot1(inputs)
	return en_templates_addslot1(inputs)
});
export { templates_addslot1 as "templates.addSlot" }