/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Importpage_Description1Inputs */

const en_importpage_description1 = /** @type {(inputs: Importpage_Description1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Load recipients from an Excel file, review the preview, and commit them to the database.`)
};

const id_importpage_description1 = /** @type {(inputs: Importpage_Description1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Muat penerima dari file Excel, tinjau pratinjaunya, dan simpan ke database.`)
};

/**
* | output |
* | --- |
* | "Load recipients from an Excel file, review the preview, and commit them to the database." |
*
* @param {Importpage_Description1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_description1 = /** @type {((inputs?: Importpage_Description1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Description1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importpage_description1(inputs)
	return en_importpage_description1(inputs)
});
export { importpage_description1 as "importPage.description" }