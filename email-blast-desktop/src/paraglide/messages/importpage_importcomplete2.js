/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Importpage_Importcomplete2Inputs */

const en_importpage_importcomplete2 = /** @type {(inputs: Importpage_Importcomplete2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Import complete`)
};

const id_importpage_importcomplete2 = /** @type {(inputs: Importpage_Importcomplete2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Impor selesai`)
};

/**
* | output |
* | --- |
* | "Import complete" |
*
* @param {Importpage_Importcomplete2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_importcomplete2 = /** @type {((inputs?: Importpage_Importcomplete2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Importcomplete2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importpage_importcomplete2(inputs)
	return en_importpage_importcomplete2(inputs)
});
export { importpage_importcomplete2 as "importPage.importComplete" }