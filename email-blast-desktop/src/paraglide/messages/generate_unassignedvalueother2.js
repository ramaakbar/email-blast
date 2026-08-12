/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ value: NonNullable<unknown>, count: NonNullable<unknown>, names: NonNullable<unknown> }} Generate_Unassignedvalueother2Inputs */

const en_generate_unassignedvalueother2 = /** @type {(inputs: Generate_Unassignedvalueother2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`"${i?.value}" - ${i?.count} recipients: ${i?.names}`)
};

const id_generate_unassignedvalueother2 = /** @type {(inputs: Generate_Unassignedvalueother2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`"${i?.value}" - ${i?.count} penerima: ${i?.names}`)
};

/**
* | output |
* | --- |
* | "\"{value}\" - {count} recipients: {names}" |
*
* @param {Generate_Unassignedvalueother2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_unassignedvalueother2 = /** @type {((inputs: Generate_Unassignedvalueother2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_Unassignedvalueother2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_unassignedvalueother2(inputs)
	return en_generate_unassignedvalueother2(inputs)
});
export { generate_unassignedvalueother2 as "generate.unassignedValueOther" }