/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ fileName: NonNullable<unknown> }} Importpage_Notexcelfile3Inputs */

const en_importpage_notexcelfile3 = /** @type {(inputs: Importpage_Notexcelfile3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`"${i?.fileName}" is not an Excel file. Choose a .xlsx or .xls file.`)
};

const id_importpage_notexcelfile3 = /** @type {(inputs: Importpage_Notexcelfile3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`"${i?.fileName}" bukan file Excel. Pilih file .xlsx atau .xls.`)
};

/**
* | output |
* | --- |
* | "\"{fileName}\" is not an Excel file. Choose a .xlsx or .xls file." |
*
* @param {Importpage_Notexcelfile3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_notexcelfile3 = /** @type {((inputs: Importpage_Notexcelfile3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Notexcelfile3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importpage_notexcelfile3(inputs)
	return en_importpage_notexcelfile3(inputs)
});
export { importpage_notexcelfile3 as "importPage.notExcelFile" }