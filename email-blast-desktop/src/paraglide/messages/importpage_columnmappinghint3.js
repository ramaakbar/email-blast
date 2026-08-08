/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Importpage_Columnmappinghint3Inputs */

const en_importpage_columnmappinghint3 = /** @type {(inputs: Importpage_Columnmappinghint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Match each Excel column to a recipient field. Name, email, and phone can each be used once; other columns become metadata available to template placeholders.`)
};

const id_importpage_columnmappinghint3 = /** @type {(inputs: Importpage_Columnmappinghint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cocokkan setiap kolom Excel ke bidang penerima. Nama, email, dan telepon masing-masing bisa dipakai sekali; kolom lain menjadi metadata yang tersedia untuk placeholder template.`)
};

/**
* | output |
* | --- |
* | "Match each Excel column to a recipient field. Name, email, and phone can each be used once; other columns become metadata available to template placeholders." |
*
* @param {Importpage_Columnmappinghint3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_columnmappinghint3 = /** @type {((inputs?: Importpage_Columnmappinghint3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Columnmappinghint3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importpage_columnmappinghint3(inputs)
	return en_importpage_columnmappinghint3(inputs)
});
export { importpage_columnmappinghint3 as "importPage.columnMappingHint" }