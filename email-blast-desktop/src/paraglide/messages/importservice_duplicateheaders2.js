/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ headers: NonNullable<unknown> }} Importservice_Duplicateheaders2Inputs */

const en_importservice_duplicateheaders2 = /** @type {(inputs: Importservice_Duplicateheaders2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Column headers ${i?.headers} appear more than once after trimming - only the first occurrence is imported.`)
};

const id_importservice_duplicateheaders2 = /** @type {(inputs: Importservice_Duplicateheaders2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Header kolom ${i?.headers} muncul lebih dari sekali setelah dipangkas - hanya kemunculan pertama yang diimpor.`)
};

/**
* | output |
* | --- |
* | "Column headers {headers} appear more than once after trimming - only the first occurrence is imported." |
*
* @param {Importservice_Duplicateheaders2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importservice_duplicateheaders2 = /** @type {((inputs: Importservice_Duplicateheaders2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importservice_Duplicateheaders2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importservice_duplicateheaders2(inputs)
	return en_importservice_duplicateheaders2(inputs)
});
export { importservice_duplicateheaders2 as "importService.duplicateHeaders" }