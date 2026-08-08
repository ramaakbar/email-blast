/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Importpage_Preview1Inputs */

const en_importpage_preview1 = /** @type {(inputs: Importpage_Preview1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Preview`)
};

const id_importpage_preview1 = /** @type {(inputs: Importpage_Preview1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pratinjau`)
};

/**
* | output |
* | --- |
* | "Preview" |
*
* @param {Importpage_Preview1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_preview1 = /** @type {((inputs?: Importpage_Preview1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Preview1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importpage_preview1(inputs)
	return en_importpage_preview1(inputs)
});
export { importpage_preview1 as "importPage.preview" }