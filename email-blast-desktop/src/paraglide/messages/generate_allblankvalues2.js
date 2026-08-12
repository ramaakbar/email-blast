/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ column: NonNullable<unknown> }} Generate_Allblankvalues2Inputs */

const en_generate_allblankvalues2 = /** @type {(inputs: Generate_Allblankvalues2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`All selected recipients have a blank ${i?.column} value - everyone uses the default template.`)
};

const id_generate_allblankvalues2 = /** @type {(inputs: Generate_Allblankvalues2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Semua penerima terpilih memiliki nilai ${i?.column} kosong - semua memakai template default.`)
};

/**
* | output |
* | --- |
* | "All selected recipients have a blank {column} value - everyone uses the default template." |
*
* @param {Generate_Allblankvalues2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_allblankvalues2 = /** @type {((inputs: Generate_Allblankvalues2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_Allblankvalues2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_allblankvalues2(inputs)
	return en_generate_allblankvalues2(inputs)
});
export { generate_allblankvalues2 as "generate.allBlankValues" }