/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Importservice_Notexcel2Inputs */

const en_importservice_notexcel2 = /** @type {(inputs: Importservice_Notexcel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Not an Excel file (.xlsx or .xls expected)`)
};

const id_importservice_notexcel2 = /** @type {(inputs: Importservice_Notexcel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bukan file Excel (.xlsx atau .xls diharapkan)`)
};

/**
* | output |
* | --- |
* | "Not an Excel file (.xlsx or .xls expected)" |
*
* @param {Importservice_Notexcel2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importservice_notexcel2 = /** @type {((inputs?: Importservice_Notexcel2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importservice_Notexcel2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importservice_notexcel2(inputs)
	return en_importservice_notexcel2(inputs)
});
export { importservice_notexcel2 as "importService.notExcel" }