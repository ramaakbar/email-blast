/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Importservice_Rowsskippedemptyname4Inputs */

const en_importservice_rowsskippedemptyname4 = /** @type {(inputs: Importservice_Rowsskippedemptyname4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} row(s) skipped because the name is empty.`)
};

const id_importservice_rowsskippedemptyname4 = /** @type {(inputs: Importservice_Rowsskippedemptyname4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} baris dilewati karena nama kosong.`)
};

/**
* | output |
* | --- |
* | "{count} row(s) skipped because the name is empty." |
*
* @param {Importservice_Rowsskippedemptyname4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importservice_rowsskippedemptyname4 = /** @type {((inputs: Importservice_Rowsskippedemptyname4Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importservice_Rowsskippedemptyname4Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importservice_rowsskippedemptyname4(inputs)
	return en_importservice_rowsskippedemptyname4(inputs)
});
export { importservice_rowsskippedemptyname4 as "importService.rowsSkippedEmptyName" }