/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Templates_Slotmaxwidth2Inputs */

const en_templates_slotmaxwidth2 = /** @type {(inputs: Templates_Slotmaxwidth2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Max width`)
};

const id_templates_slotmaxwidth2 = /** @type {(inputs: Templates_Slotmaxwidth2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lebar maksimum`)
};

/**
* | output |
* | --- |
* | "Max width" |
*
* @param {Templates_Slotmaxwidth2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_slotmaxwidth2 = /** @type {((inputs?: Templates_Slotmaxwidth2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Slotmaxwidth2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_slotmaxwidth2(inputs)
	return en_templates_slotmaxwidth2(inputs)
});
export { templates_slotmaxwidth2 as "templates.slotMaxWidth" }