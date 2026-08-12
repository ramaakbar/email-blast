/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ column: NonNullable<unknown> }} Generate_Defaulttemplatehint2Inputs */

const en_generate_defaulttemplatehint2 = /** @type {(inputs: Generate_Defaulttemplatehint2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Recipients with a blank ${i?.column} value use this template.`)
};

const id_generate_defaulttemplatehint2 = /** @type {(inputs: Generate_Defaulttemplatehint2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Penerima dengan nilai ${i?.column} kosong memakai template ini.`)
};

/**
* | output |
* | --- |
* | "Recipients with a blank {column} value use this template." |
*
* @param {Generate_Defaulttemplatehint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_defaulttemplatehint2 = /** @type {((inputs: Generate_Defaulttemplatehint2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_Defaulttemplatehint2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_defaulttemplatehint2(inputs)
	return en_generate_defaulttemplatehint2(inputs)
});
export { generate_defaulttemplatehint2 as "generate.defaultTemplateHint" }