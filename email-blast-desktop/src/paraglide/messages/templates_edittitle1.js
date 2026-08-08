/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Templates_Edittitle1Inputs */

const en_templates_edittitle1 = /** @type {(inputs: Templates_Edittitle1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Edit "${i?.name}"`)
};

const id_templates_edittitle1 = /** @type {(inputs: Templates_Edittitle1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Edit "${i?.name}"`)
};

/**
* | output |
* | --- |
* | "Edit \"{name}\"" |
*
* @param {Templates_Edittitle1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const templates_edittitle1 = /** @type {((inputs: Templates_Edittitle1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Templates_Edittitle1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_templates_edittitle1(inputs)
	return en_templates_edittitle1(inputs)
});
export { templates_edittitle1 as "templates.editTitle" }