/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ imported: NonNullable<unknown>, fileName: NonNullable<unknown>, duplicatesSkipped: NonNullable<unknown> }} Importpage_Importcompletedetailone4Inputs */

const en_importpage_importcompletedetailone4 = /** @type {(inputs: Importpage_Importcompletedetailone4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Imported ${i?.imported} recipients from ${i?.fileName}. ${i?.duplicatesSkipped} duplicate skipped.`)
};

const id_importpage_importcompletedetailone4 = /** @type {(inputs: Importpage_Importcompletedetailone4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.imported} penerima diimpor dari ${i?.fileName}. ${i?.duplicatesSkipped} duplikat dilewati.`)
};

/**
* | output |
* | --- |
* | "Imported {imported} recipients from {fileName}. {duplicatesSkipped} duplicate skipped." |
*
* @param {Importpage_Importcompletedetailone4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_importcompletedetailone4 = /** @type {((inputs: Importpage_Importcompletedetailone4Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Importcompletedetailone4Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importpage_importcompletedetailone4(inputs)
	return en_importpage_importcompletedetailone4(inputs)
});
export { importpage_importcompletedetailone4 as "importPage.importCompleteDetailOne" }