/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Importpage_Rowsskippednonameone5Inputs */

const en_importpage_rowsskippednonameone5 = /** @type {(inputs: Importpage_Rowsskippednonameone5Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} row skipped: the name column was empty for it.`)
};

const id_importpage_rowsskippednonameone5 = /** @type {(inputs: Importpage_Rowsskippednonameone5Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} baris dilewati: kolom nama kosong.`)
};

/**
* | output |
* | --- |
* | "{count} row skipped: the name column was empty for it." |
*
* @param {Importpage_Rowsskippednonameone5Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_rowsskippednonameone5 = /** @type {((inputs: Importpage_Rowsskippednonameone5Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Rowsskippednonameone5Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importpage_rowsskippednonameone5(inputs)
	return en_importpage_rowsskippednonameone5(inputs)
});
export { importpage_rowsskippednonameone5 as "importPage.rowsSkippedNoNameOne" }