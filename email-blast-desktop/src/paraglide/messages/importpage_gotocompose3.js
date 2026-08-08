/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Importpage_Gotocompose3Inputs */

const en_importpage_gotocompose3 = /** @type {(inputs: Importpage_Gotocompose3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go to Compose`)
};

const id_importpage_gotocompose3 = /** @type {(inputs: Importpage_Gotocompose3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Buka Buat Email`)
};

/**
* | output |
* | --- |
* | "Go to Compose" |
*
* @param {Importpage_Gotocompose3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_gotocompose3 = /** @type {((inputs?: Importpage_Gotocompose3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Gotocompose3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importpage_gotocompose3(inputs)
	return en_importpage_gotocompose3(inputs)
});
export { importpage_gotocompose3 as "importPage.goToCompose" }