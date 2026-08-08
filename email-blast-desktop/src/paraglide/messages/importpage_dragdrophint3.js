/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Importpage_Dragdrophint3Inputs */

const en_importpage_dragdrophint3 = /** @type {(inputs: Importpage_Dragdrophint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Drag and drop an Excel file here`)
};

const id_importpage_dragdrophint3 = /** @type {(inputs: Importpage_Dragdrophint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Seret dan letakkan file Excel di sini`)
};

/**
* | output |
* | --- |
* | "Drag and drop an Excel file here" |
*
* @param {Importpage_Dragdrophint3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_dragdrophint3 = /** @type {((inputs?: Importpage_Dragdrophint3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Dragdrophint3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importpage_dragdrophint3(inputs)
	return en_importpage_dragdrophint3(inputs)
});
export { importpage_dragdrophint3 as "importPage.dragDropHint" }