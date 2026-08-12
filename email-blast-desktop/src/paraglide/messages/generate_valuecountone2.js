/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Generate_Valuecountone2Inputs */

const en_generate_valuecountone2 = /** @type {(inputs: Generate_Valuecountone2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} recipient`)
};

const id_generate_valuecountone2 = /** @type {(inputs: Generate_Valuecountone2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} penerima`)
};

/**
* | output |
* | --- |
* | "{count} recipient" |
*
* @param {Generate_Valuecountone2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_valuecountone2 = /** @type {((inputs: Generate_Valuecountone2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_Valuecountone2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_valuecountone2(inputs)
	return en_generate_valuecountone2(inputs)
});
export { generate_valuecountone2 as "generate.valueCountOne" }