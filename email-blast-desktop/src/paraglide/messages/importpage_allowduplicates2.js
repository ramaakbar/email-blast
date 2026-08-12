/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Importpage_Allowduplicates2Inputs */

const en_importpage_allowduplicates2 = /** @type {(inputs: Importpage_Allowduplicates2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Allow duplicate emails`)
};

const id_importpage_allowduplicates2 = /** @type {(inputs: Importpage_Allowduplicates2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Izinkan email duplikat`)
};

/**
* | output |
* | --- |
* | "Allow duplicate emails" |
*
* @param {Importpage_Allowduplicates2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_allowduplicates2 = /** @type {((inputs?: Importpage_Allowduplicates2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Allowduplicates2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importpage_allowduplicates2(inputs)
	return en_importpage_allowduplicates2(inputs)
});
export { importpage_allowduplicates2 as "importPage.allowDuplicates" }