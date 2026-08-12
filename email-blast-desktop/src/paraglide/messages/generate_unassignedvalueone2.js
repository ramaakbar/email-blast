/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ value: NonNullable<unknown>, count: NonNullable<unknown>, names: NonNullable<unknown> }} Generate_Unassignedvalueone2Inputs */

const en_generate_unassignedvalueone2 = /** @type {(inputs: Generate_Unassignedvalueone2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`"${i?.value}" - ${i?.count} recipient: ${i?.names}`)
};

const id_generate_unassignedvalueone2 = /** @type {(inputs: Generate_Unassignedvalueone2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`"${i?.value}" - ${i?.count} penerima: ${i?.names}`)
};

/**
* | output |
* | --- |
* | "\"{value}\" - {count} recipient: {names}" |
*
* @param {Generate_Unassignedvalueone2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_unassignedvalueone2 = /** @type {((inputs: Generate_Unassignedvalueone2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_Unassignedvalueone2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_unassignedvalueone2(inputs)
	return en_generate_unassignedvalueone2(inputs)
});
export { generate_unassignedvalueone2 as "generate.unassignedValueOne" }