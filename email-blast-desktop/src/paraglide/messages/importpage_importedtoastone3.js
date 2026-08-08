/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ imported: NonNullable<unknown>, duplicatesSkipped: NonNullable<unknown> }} Importpage_Importedtoastone3Inputs */

const en_importpage_importedtoastone3 = /** @type {(inputs: Importpage_Importedtoastone3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Imported ${i?.imported} recipients. ${i?.duplicatesSkipped} duplicate skipped.`)
};

const id_importpage_importedtoastone3 = /** @type {(inputs: Importpage_Importedtoastone3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.imported} penerima diimpor. ${i?.duplicatesSkipped} duplikat dilewati.`)
};

/**
* | output |
* | --- |
* | "Imported {imported} recipients. {duplicatesSkipped} duplicate skipped." |
*
* @param {Importpage_Importedtoastone3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_importedtoastone3 = /** @type {((inputs: Importpage_Importedtoastone3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Importedtoastone3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importpage_importedtoastone3(inputs)
	return en_importpage_importedtoastone3(inputs)
});
export { importpage_importedtoastone3 as "importPage.importedToastOne" }