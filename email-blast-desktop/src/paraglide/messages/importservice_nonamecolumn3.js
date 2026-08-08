/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Importservice_Nonamecolumn3Inputs */

const en_importservice_nonamecolumn3 = /** @type {(inputs: Importservice_Nonamecolumn3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No recognizable name column was found. Select it in the mapping below.`)
};

const id_importservice_nonamecolumn3 = /** @type {(inputs: Importservice_Nonamecolumn3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tidak ada kolom nama yang dikenali. Pilih kolomnya di pemetaan di bawah.`)
};

/**
* | output |
* | --- |
* | "No recognizable name column was found. Select it in the mapping below." |
*
* @param {Importservice_Nonamecolumn3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importservice_nonamecolumn3 = /** @type {((inputs?: Importservice_Nonamecolumn3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importservice_Nonamecolumn3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importservice_nonamecolumn3(inputs)
	return en_importservice_nonamecolumn3(inputs)
});
export { importservice_nonamecolumn3 as "importService.noNameColumn" }