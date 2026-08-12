/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Generate_Assignmenttitle1Inputs */

const en_generate_assignmenttitle1 = /** @type {(inputs: Generate_Assignmenttitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Assign each value to a template`)
};

const id_generate_assignmenttitle1 = /** @type {(inputs: Generate_Assignmenttitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tetapkan setiap nilai ke template`)
};

/**
* | output |
* | --- |
* | "Assign each value to a template" |
*
* @param {Generate_Assignmenttitle1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_assignmenttitle1 = /** @type {((inputs?: Generate_Assignmenttitle1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_Assignmenttitle1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_assignmenttitle1(inputs)
	return en_generate_assignmenttitle1(inputs)
});
export { generate_assignmenttitle1 as "generate.assignmentTitle" }