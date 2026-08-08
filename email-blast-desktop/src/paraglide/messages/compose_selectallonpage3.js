/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Selectallonpage3Inputs */

const en_compose_selectallonpage3 = /** @type {(inputs: Compose_Selectallonpage3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Select all on this page`)
};

const id_compose_selectallonpage3 = /** @type {(inputs: Compose_Selectallonpage3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pilih semua di halaman ini`)
};

/**
* | output |
* | --- |
* | "Select all on this page" |
*
* @param {Compose_Selectallonpage3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_selectallonpage3 = /** @type {((inputs?: Compose_Selectallonpage3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Selectallonpage3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_selectallonpage3(inputs)
	return en_compose_selectallonpage3(inputs)
});
export { compose_selectallonpage3 as "compose.selectAllOnPage" }