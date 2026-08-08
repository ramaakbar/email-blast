/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Importpage_Rowsskippednonameother5Inputs */

const en_importpage_rowsskippednonameother5 = /** @type {(inputs: Importpage_Rowsskippednonameother5Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} rows skipped: the name column was empty for them.`)
};

const id_importpage_rowsskippednonameother5 = /** @type {(inputs: Importpage_Rowsskippednonameother5Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} baris dilewati: kolom nama kosong.`)
};

/**
* | output |
* | --- |
* | "{count} rows skipped: the name column was empty for them." |
*
* @param {Importpage_Rowsskippednonameother5Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_rowsskippednonameother5 = /** @type {((inputs: Importpage_Rowsskippednonameother5Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Rowsskippednonameother5Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importpage_rowsskippednonameother5(inputs)
	return en_importpage_rowsskippednonameother5(inputs)
});
export { importpage_rowsskippednonameother5 as "importPage.rowsSkippedNoNameOther" }