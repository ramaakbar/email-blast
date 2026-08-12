/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Generate_Unassignedsummary1Inputs */

const en_generate_unassignedsummary1 = /** @type {(inputs: Generate_Unassignedsummary1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} recipients have a template-column value that is not assigned to any template.`)
};

const id_generate_unassignedsummary1 = /** @type {(inputs: Generate_Unassignedsummary1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} penerima memiliki nilai kolom template yang belum ditetapkan ke template mana pun.`)
};

/**
* | output |
* | --- |
* | "{count} recipients have a template-column value that is not assigned to any template." |
*
* @param {Generate_Unassignedsummary1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_unassignedsummary1 = /** @type {((inputs: Generate_Unassignedsummary1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_Unassignedsummary1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_unassignedsummary1(inputs)
	return en_generate_unassignedsummary1(inputs)
});
export { generate_unassignedsummary1 as "generate.unassignedSummary" }