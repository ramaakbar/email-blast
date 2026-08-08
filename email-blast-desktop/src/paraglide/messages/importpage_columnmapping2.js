/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Importpage_Columnmapping2Inputs */

const en_importpage_columnmapping2 = /** @type {(inputs: Importpage_Columnmapping2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Column mapping`)
};

const id_importpage_columnmapping2 = /** @type {(inputs: Importpage_Columnmapping2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pemetaan kolom`)
};

/**
* | output |
* | --- |
* | "Column mapping" |
*
* @param {Importpage_Columnmapping2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_columnmapping2 = /** @type {((inputs?: Importpage_Columnmapping2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Columnmapping2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importpage_columnmapping2(inputs)
	return en_importpage_columnmapping2(inputs)
});
export { importpage_columnmapping2 as "importPage.columnMapping" }