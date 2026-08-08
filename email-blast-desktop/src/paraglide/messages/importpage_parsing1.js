/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ fileName: NonNullable<unknown> }} Importpage_Parsing1Inputs */

const en_importpage_parsing1 = /** @type {(inputs: Importpage_Parsing1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Parsing ${i?.fileName}…`)
};

const id_importpage_parsing1 = /** @type {(inputs: Importpage_Parsing1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Membaca ${i?.fileName}…`)
};

/**
* | output |
* | --- |
* | "Parsing {fileName}…" |
*
* @param {Importpage_Parsing1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_parsing1 = /** @type {((inputs: Importpage_Parsing1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Parsing1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importpage_parsing1(inputs)
	return en_importpage_parsing1(inputs)
});
export { importpage_parsing1 as "importPage.parsing" }