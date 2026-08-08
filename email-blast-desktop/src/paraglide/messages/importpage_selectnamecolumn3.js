/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Importpage_Selectnamecolumn3Inputs */

const en_importpage_selectnamecolumn3 = /** @type {(inputs: Importpage_Selectnamecolumn3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Select a name column to import`)
};

const id_importpage_selectnamecolumn3 = /** @type {(inputs: Importpage_Selectnamecolumn3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pilih kolom nama untuk diimpor`)
};

/**
* | output |
* | --- |
* | "Select a name column to import" |
*
* @param {Importpage_Selectnamecolumn3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_selectnamecolumn3 = /** @type {((inputs?: Importpage_Selectnamecolumn3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Selectnamecolumn3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importpage_selectnamecolumn3(inputs)
	return en_importpage_selectnamecolumn3(inputs)
});
export { importpage_selectnamecolumn3 as "importPage.selectNameColumn" }