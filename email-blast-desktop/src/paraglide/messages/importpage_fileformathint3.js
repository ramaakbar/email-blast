/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Importpage_Fileformathint3Inputs */

const en_importpage_fileformathint3 = /** @type {(inputs: Importpage_Fileformathint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.xlsx or .xls, with the recipient list in the first sheet`)
};

const id_importpage_fileformathint3 = /** @type {(inputs: Importpage_Fileformathint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.xlsx atau .xls, dengan daftar penerima di sheet pertama`)
};

/**
* | output |
* | --- |
* | ".xlsx or .xls, with the recipient list in the first sheet" |
*
* @param {Importpage_Fileformathint3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_fileformathint3 = /** @type {((inputs?: Importpage_Fileformathint3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Fileformathint3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importpage_fileformathint3(inputs)
	return en_importpage_fileformathint3(inputs)
});
export { importpage_fileformathint3 as "importPage.fileFormatHint" }