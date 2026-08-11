/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Generate_Couldnotsavepdf3Inputs */

const en_generate_couldnotsavepdf3 = /** @type {(inputs: Generate_Couldnotsavepdf3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not save the PDF.`)
};

const id_generate_couldnotsavepdf3 = /** @type {(inputs: Generate_Couldnotsavepdf3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tidak dapat menyimpan PDF.`)
};

/**
* | output |
* | --- |
* | "Could not save the PDF." |
*
* @param {Generate_Couldnotsavepdf3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_couldnotsavepdf3 = /** @type {((inputs?: Generate_Couldnotsavepdf3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_Couldnotsavepdf3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_couldnotsavepdf3(inputs)
	return en_generate_couldnotsavepdf3(inputs)
});
export { generate_couldnotsavepdf3 as "generate.couldNotSavePdf" }