/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Importpage_Gotogenerate3Inputs */

const en_importpage_gotogenerate3 = /** @type {(inputs: Importpage_Gotogenerate3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go to Generate`)
};

const id_importpage_gotogenerate3 = /** @type {(inputs: Importpage_Gotogenerate3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Buka Generate`)
};

/**
* | output |
* | --- |
* | "Go to Generate" |
*
* @param {Importpage_Gotogenerate3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_gotogenerate3 = /** @type {((inputs?: Importpage_Gotogenerate3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Gotogenerate3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importpage_gotogenerate3(inputs)
	return en_importpage_gotogenerate3(inputs)
});
export { importpage_gotogenerate3 as "importPage.goToGenerate" }