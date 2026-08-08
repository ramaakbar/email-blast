/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ total: NonNullable<unknown> }} Compose_Selectallcount2Inputs */

const en_compose_selectallcount2 = /** @type {(inputs: Compose_Selectallcount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Select all ${i?.total}`)
};

const id_compose_selectallcount2 = /** @type {(inputs: Compose_Selectallcount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Pilih semua ${i?.total}`)
};

/**
* | output |
* | --- |
* | "Select all {total}" |
*
* @param {Compose_Selectallcount2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_selectallcount2 = /** @type {((inputs: Compose_Selectallcount2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Selectallcount2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_selectallcount2(inputs)
	return en_compose_selectallcount2(inputs)
});
export { compose_selectallcount2 as "compose.selectAllCount" }