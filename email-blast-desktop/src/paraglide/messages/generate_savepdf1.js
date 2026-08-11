/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Generate_Savepdf1Inputs */

const en_generate_savepdf1 = /** @type {(inputs: Generate_Savepdf1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Save PDF`)
};

const id_generate_savepdf1 = /** @type {(inputs: Generate_Savepdf1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Simpan PDF`)
};

/**
* | output |
* | --- |
* | "Save PDF" |
*
* @param {Generate_Savepdf1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_savepdf1 = /** @type {((inputs?: Generate_Savepdf1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_Savepdf1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_savepdf1(inputs)
	return en_generate_savepdf1(inputs)
});
export { generate_savepdf1 as "generate.savePdf" }