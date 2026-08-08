/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Templates_Deletetitle1Inputs */

const en_templates_deletetitle1 = /** @type {(inputs: Templates_Deletetitle1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Delete "${i?.name}"?`)
};

const id_templates_deletetitle1 = /** @type {(inputs: Templates_Deletetitle1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Hapus "${i?.name}"?`)
};

/**
* | output |
* | --- |
* | "Delete \"{name}\"?" |
*
* @param {Templates_Deletetitle1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_deletetitle1 = /** @type {((inputs: Templates_Deletetitle1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Deletetitle1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_deletetitle1(inputs)
	return en_templates_deletetitle1(inputs)
});
export { templates_deletetitle1 as "templates.deleteTitle" }