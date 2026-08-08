/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Importpage_Duplicatesskippedparsingother4Inputs */

const en_importpage_duplicatesskippedparsingother4 = /** @type {(inputs: Importpage_Duplicatesskippedparsingother4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} duplicates already skipped during parsing.`)
};

const id_importpage_duplicatesskippedparsingother4 = /** @type {(inputs: Importpage_Duplicatesskippedparsingother4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} duplikat sudah dilewati saat parsing.`)
};

/**
* | output |
* | --- |
* | "{count} duplicates already skipped during parsing." |
*
* @param {Importpage_Duplicatesskippedparsingother4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_duplicatesskippedparsingother4 = /** @type {((inputs: Importpage_Duplicatesskippedparsingother4Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Duplicatesskippedparsingother4Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importpage_duplicatesskippedparsingother4(inputs)
	return en_importpage_duplicatesskippedparsingother4(inputs)
});
export { importpage_duplicatesskippedparsingother4 as "importPage.duplicatesSkippedParsingOther" }