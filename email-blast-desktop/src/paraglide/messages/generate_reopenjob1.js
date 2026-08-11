/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Generate_Reopenjob1Inputs */

const en_generate_reopenjob1 = /** @type {(inputs: Generate_Reopenjob1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Reopen`)
};

const id_generate_reopenjob1 = /** @type {(inputs: Generate_Reopenjob1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Buka`)
};

/**
* | output |
* | --- |
* | "Reopen" |
*
* @param {Generate_Reopenjob1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_reopenjob1 = /** @type {((inputs?: Generate_Reopenjob1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_Reopenjob1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_reopenjob1(inputs)
	return en_generate_reopenjob1(inputs)
});
export { generate_reopenjob1 as "generate.reopenJob" }