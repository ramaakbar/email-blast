/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Generate_Prefilldeletedother2Inputs */

const en_generate_prefilldeletedother2 = /** @type {(inputs: Generate_Prefilldeletedother2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} job recipients were deleted and left out of the pre-fill.`)
};

const id_generate_prefilldeletedother2 = /** @type {(inputs: Generate_Prefilldeletedother2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} penerima pekerjaan telah dihapus dan tidak diisi ulang.`)
};

/**
* | output |
* | --- |
* | "{count} job recipients were deleted and left out of the pre-fill." |
*
* @param {Generate_Prefilldeletedother2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_prefilldeletedother2 = /** @type {((inputs: Generate_Prefilldeletedother2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_Prefilldeletedother2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_prefilldeletedother2(inputs)
	return en_generate_prefilldeletedother2(inputs)
});
export { generate_prefilldeletedother2 as "generate.prefillDeletedOther" }