/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ total: NonNullable<unknown> }} Compose_Selectallmatchingtitle3Inputs */

const en_compose_selectallmatchingtitle3 = /** @type {(inputs: Compose_Selectallmatchingtitle3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Select all ${i?.total} recipients matching the current filter`)
};

const id_compose_selectallmatchingtitle3 = /** @type {(inputs: Compose_Selectallmatchingtitle3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Pilih semua ${i?.total} penerima yang cocok dengan filter saat ini`)
};

/**
* | output |
* | --- |
* | "Select all {total} recipients matching the current filter" |
*
* @param {Compose_Selectallmatchingtitle3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_selectallmatchingtitle3 = /** @type {((inputs: Compose_Selectallmatchingtitle3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Selectallmatchingtitle3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_selectallmatchingtitle3(inputs)
	return en_compose_selectallmatchingtitle3(inputs)
});
export { compose_selectallmatchingtitle3 as "compose.selectAllMatchingTitle" }