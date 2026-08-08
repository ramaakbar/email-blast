/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ imported: NonNullable<unknown>, fileName: NonNullable<unknown>, duplicatesSkipped: NonNullable<unknown> }} Importpage_Importcompletedetailother4Inputs */

const en_importpage_importcompletedetailother4 = /** @type {(inputs: Importpage_Importcompletedetailother4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Imported ${i?.imported} recipients from ${i?.fileName}. ${i?.duplicatesSkipped} duplicates skipped.`)
};

const id_importpage_importcompletedetailother4 = /** @type {(inputs: Importpage_Importcompletedetailother4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.imported} penerima diimpor dari ${i?.fileName}. ${i?.duplicatesSkipped} duplikat dilewati.`)
};

/**
* | output |
* | --- |
* | "Imported {imported} recipients from {fileName}. {duplicatesSkipped} duplicates skipped." |
*
* @param {Importpage_Importcompletedetailother4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_importcompletedetailother4 = /** @type {((inputs: Importpage_Importcompletedetailother4Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Importcompletedetailother4Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importpage_importcompletedetailother4(inputs)
	return en_importpage_importcompletedetailother4(inputs)
});
export { importpage_importcompletedetailother4 as "importPage.importCompleteDetailOther" }