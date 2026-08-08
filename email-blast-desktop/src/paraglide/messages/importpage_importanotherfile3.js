/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Importpage_Importanotherfile3Inputs */

const en_importpage_importanotherfile3 = /** @type {(inputs: Importpage_Importanotherfile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Import another file`)
};

const id_importpage_importanotherfile3 = /** @type {(inputs: Importpage_Importanotherfile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Impor file lain`)
};

/**
* | output |
* | --- |
* | "Import another file" |
*
* @param {Importpage_Importanotherfile3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_importanotherfile3 = /** @type {((inputs?: Importpage_Importanotherfile3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Importanotherfile3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importpage_importanotherfile3(inputs)
	return en_importpage_importanotherfile3(inputs)
});
export { importpage_importanotherfile3 as "importPage.importAnotherFile" }