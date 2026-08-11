/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Generate_Couldnotreopenjob3Inputs */

const en_generate_couldnotreopenjob3 = /** @type {(inputs: Generate_Couldnotreopenjob3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not reopen the generate job.`)
};

const id_generate_couldnotreopenjob3 = /** @type {(inputs: Generate_Couldnotreopenjob3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tidak dapat membuka kembali pekerjaan generate.`)
};

/**
* | output |
* | --- |
* | "Could not reopen the generate job." |
*
* @param {Generate_Couldnotreopenjob3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_couldnotreopenjob3 = /** @type {((inputs?: Generate_Couldnotreopenjob3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_Couldnotreopenjob3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_couldnotreopenjob3(inputs)
	return en_generate_couldnotreopenjob3(inputs)
});
export { generate_couldnotreopenjob3 as "generate.couldNotReopenJob" }