/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Importpage_Nodatarows3Inputs */

const en_importpage_nodatarows3 = /** @type {(inputs: Importpage_Nodatarows3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No data rows found in the first sheet.`)
};

const id_importpage_nodatarows3 = /** @type {(inputs: Importpage_Nodatarows3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tidak ada baris data di sheet pertama.`)
};

/**
* | output |
* | --- |
* | "No data rows found in the first sheet." |
*
* @param {Importpage_Nodatarows3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_nodatarows3 = /** @type {((inputs?: Importpage_Nodatarows3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Nodatarows3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importpage_nodatarows3(inputs)
	return en_importpage_nodatarows3(inputs)
});
export { importpage_nodatarows3 as "importPage.noDataRows" }