/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Importpage_Duplicatesskippedparsingone4Inputs */

const en_importpage_duplicatesskippedparsingone4 = /** @type {(inputs: Importpage_Duplicatesskippedparsingone4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} duplicate already skipped during parsing.`)
};

const id_importpage_duplicatesskippedparsingone4 = /** @type {(inputs: Importpage_Duplicatesskippedparsingone4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} duplikat sudah dilewati saat parsing.`)
};

/**
* | output |
* | --- |
* | "{count} duplicate already skipped during parsing." |
*
* @param {Importpage_Duplicatesskippedparsingone4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_duplicatesskippedparsingone4 = /** @type {((inputs: Importpage_Duplicatesskippedparsingone4Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Duplicatesskippedparsingone4Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importpage_duplicatesskippedparsingone4(inputs)
	return en_importpage_duplicatesskippedparsingone4(inputs)
});
export { importpage_duplicatesskippedparsingone4 as "importPage.duplicatesSkippedParsingOne" }