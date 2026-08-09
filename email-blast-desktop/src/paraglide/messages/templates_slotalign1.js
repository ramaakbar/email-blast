/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Slotalign1Inputs */

const en_templates_slotalign1 = /** @type {(inputs: Templates_Slotalign1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Alignment`)
};

const id_templates_slotalign1 = /** @type {(inputs: Templates_Slotalign1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Perataan`)
};

/**
* | output |
* | --- |
* | "Alignment" |
*
* @param {Templates_Slotalign1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_slotalign1 = /** @type {((inputs?: Templates_Slotalign1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Slotalign1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_slotalign1(inputs)
	return en_templates_slotalign1(inputs)
});
export { templates_slotalign1 as "templates.slotAlign" }