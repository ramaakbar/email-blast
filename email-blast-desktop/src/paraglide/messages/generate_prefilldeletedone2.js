/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Generate_Prefilldeletedone2Inputs */

const en_generate_prefilldeletedone2 = /** @type {(inputs: Generate_Prefilldeletedone2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} job recipient was deleted and left out of the pre-fill.`)
};

const id_generate_prefilldeletedone2 = /** @type {(inputs: Generate_Prefilldeletedone2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} penerima pekerjaan telah dihapus dan tidak diisi ulang.`)
};

/**
* | output |
* | --- |
* | "{count} job recipient was deleted and left out of the pre-fill." |
*
* @param {Generate_Prefilldeletedone2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const generate_prefilldeletedone2 = /** @type {((inputs: Generate_Prefilldeletedone2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Generate_Prefilldeletedone2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_generate_prefilldeletedone2(inputs)
	return en_generate_prefilldeletedone2(inputs)
});
export { generate_prefilldeletedone2 as "generate.prefillDeletedOne" }