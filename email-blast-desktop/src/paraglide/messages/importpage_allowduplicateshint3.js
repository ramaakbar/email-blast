/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Importpage_Allowduplicateshint3Inputs */

const en_importpage_allowduplicateshint3 = /** @type {(inputs: Importpage_Allowduplicateshint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Import every row even when emails repeat (for test blasts).`)
};

const id_importpage_allowduplicateshint3 = /** @type {(inputs: Importpage_Allowduplicateshint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Impor semua baris meskipun email berulang (untuk test blast).`)
};

/**
* | output |
* | --- |
* | "Import every row even when emails repeat (for test blasts)." |
*
* @param {Importpage_Allowduplicateshint3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_allowduplicateshint3 = /** @type {((inputs?: Importpage_Allowduplicateshint3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Allowduplicateshint3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importpage_allowduplicateshint3(inputs)
	return en_importpage_allowduplicateshint3(inputs)
});
export { importpage_allowduplicateshint3 as "importPage.allowDuplicatesHint" }