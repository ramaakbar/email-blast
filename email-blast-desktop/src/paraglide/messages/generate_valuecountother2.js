/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Generate_Valuecountother2Inputs */

const en_generate_valuecountother2 = /** @type {(inputs: Generate_Valuecountother2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} recipients`)
};

const id_generate_valuecountother2 = /** @type {(inputs: Generate_Valuecountother2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} penerima`)
};

/**
* | output |
* | --- |
* | "{count} recipients" |
*
* @param {Generate_Valuecountother2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_valuecountother2 = /** @type {((inputs: Generate_Valuecountother2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_Valuecountother2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_valuecountother2(inputs)
	return en_generate_valuecountother2(inputs)
});
export { generate_valuecountother2 as "generate.valueCountOther" }