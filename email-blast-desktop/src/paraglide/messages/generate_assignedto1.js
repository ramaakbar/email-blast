/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ value: NonNullable<unknown> }} Generate_Assignedto1Inputs */

const en_generate_assignedto1 = /** @type {(inputs: Generate_Assignedto1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Template for "${i?.value}"`)
};

const id_generate_assignedto1 = /** @type {(inputs: Generate_Assignedto1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Template untuk "${i?.value}"`)
};

/**
* | output |
* | --- |
* | "Template for \"{value}\"" |
*
* @param {Generate_Assignedto1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_assignedto1 = /** @type {((inputs: Generate_Assignedto1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_Assignedto1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_assignedto1(inputs)
	return en_generate_assignedto1(inputs)
});
export { generate_assignedto1 as "generate.assignedTo" }