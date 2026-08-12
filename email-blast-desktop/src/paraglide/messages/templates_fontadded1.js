/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ family: NonNullable<unknown> }} Templates_Fontadded1Inputs */

const en_templates_fontadded1 = /** @type {(inputs: Templates_Fontadded1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Font "${i?.family}" added.`)
};

const id_templates_fontadded1 = /** @type {(inputs: Templates_Fontadded1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Huruf "${i?.family}" ditambahkan.`)
};

/**
* | output |
* | --- |
* | "Font \"{family}\" added." |
*
* @param {Templates_Fontadded1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_fontadded1 = /** @type {((inputs: Templates_Fontadded1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Fontadded1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_fontadded1(inputs)
	return en_templates_fontadded1(inputs)
});
export { templates_fontadded1 as "templates.fontAdded" }