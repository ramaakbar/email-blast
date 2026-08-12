/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Generate_Unassignedsummaryone2Inputs */

const en_generate_unassignedsummaryone2 = /** @type {(inputs: Generate_Unassignedsummaryone2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} recipient has a template-column value that is not assigned to any template.`)
};

const id_generate_unassignedsummaryone2 = /** @type {(inputs: Generate_Unassignedsummaryone2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} penerima memiliki nilai kolom template yang belum ditetapkan ke template mana pun.`)
};

/**
* | output |
* | --- |
* | "{count} recipient has a template-column value that is not assigned to any template." |
*
* @param {Generate_Unassignedsummaryone2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_unassignedsummaryone2 = /** @type {((inputs: Generate_Unassignedsummaryone2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_Unassignedsummaryone2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_unassignedsummaryone2(inputs)
	return en_generate_unassignedsummaryone2(inputs)
});
export { generate_unassignedsummaryone2 as "generate.unassignedSummaryOne" }