/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ imported: NonNullable<unknown>, duplicatesSkipped: NonNullable<unknown> }} Importpage_Importedtoastother3Inputs */

const en_importpage_importedtoastother3 = /** @type {(inputs: Importpage_Importedtoastother3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Imported ${i?.imported} recipients. ${i?.duplicatesSkipped} duplicates skipped.`)
};

const id_importpage_importedtoastother3 = /** @type {(inputs: Importpage_Importedtoastother3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.imported} penerima diimpor. ${i?.duplicatesSkipped} duplikat dilewati.`)
};

/**
* | output |
* | --- |
* | "Imported {imported} recipients. {duplicatesSkipped} duplicates skipped." |
*
* @param {Importpage_Importedtoastother3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_importedtoastother3 = /** @type {((inputs: Importpage_Importedtoastother3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Importedtoastother3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importpage_importedtoastother3(inputs)
	return en_importpage_importedtoastother3(inputs)
});
export { importpage_importedtoastother3 as "importPage.importedToastOther" }