/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Noslotsdeclared2Inputs */

const en_templates_noslotsdeclared2 = /** @type {(inputs: Templates_Noslotsdeclared2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No slots declared.`)
};

const id_templates_noslotsdeclared2 = /** @type {(inputs: Templates_Noslotsdeclared2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Belum ada slot yang dideklarasikan.`)
};

/**
* | output |
* | --- |
* | "No slots declared." |
*
* @param {Templates_Noslotsdeclared2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_noslotsdeclared2 = /** @type {((inputs?: Templates_Noslotsdeclared2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Noslotsdeclared2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_noslotsdeclared2(inputs)
	return en_templates_noslotsdeclared2(inputs)
});
export { templates_noslotsdeclared2 as "templates.noSlotsDeclared" }