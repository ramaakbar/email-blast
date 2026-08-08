/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Importservice_Noemailcolumn3Inputs */

const en_importservice_noemailcolumn3 = /** @type {(inputs: Importservice_Noemailcolumn3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No recognizable email column was found. Select it in the mapping below.`)
};

const id_importservice_noemailcolumn3 = /** @type {(inputs: Importservice_Noemailcolumn3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tidak ada kolom email yang dikenali. Pilih kolomnya di pemetaan di bawah.`)
};

/**
* | output |
* | --- |
* | "No recognizable email column was found. Select it in the mapping below." |
*
* @param {Importservice_Noemailcolumn3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importservice_noemailcolumn3 = /** @type {((inputs?: Importservice_Noemailcolumn3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importservice_Noemailcolumn3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importservice_noemailcolumn3(inputs)
	return en_importservice_noemailcolumn3(inputs)
});
export { importservice_noemailcolumn3 as "importService.noEmailColumn" }