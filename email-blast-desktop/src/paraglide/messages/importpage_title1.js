/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Importpage_Title1Inputs */

const en_importpage_title1 = /** @type {(inputs: Importpage_Title1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Import`)
};

const id_importpage_title1 = /** @type {(inputs: Importpage_Title1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Impor`)
};

/**
* | output |
* | --- |
* | "Import" |
*
* @param {Importpage_Title1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_title1 = /** @type {((inputs?: Importpage_Title1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Title1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importpage_title1(inputs)
	return en_importpage_title1(inputs)
});
export { importpage_title1 as "importPage.title" }