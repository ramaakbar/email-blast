/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Importpage_Couldnotread3Inputs */

const en_importpage_couldnotread3 = /** @type {(inputs: Importpage_Couldnotread3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not read the file. It may not be a valid Excel file.`)
};

const id_importpage_couldnotread3 = /** @type {(inputs: Importpage_Couldnotread3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gagal membaca file. Mungkin bukan file Excel yang valid.`)
};

/**
* | output |
* | --- |
* | "Could not read the file. It may not be a valid Excel file." |
*
* @param {Importpage_Couldnotread3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_couldnotread3 = /** @type {((inputs?: Importpage_Couldnotread3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Couldnotread3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importpage_couldnotread3(inputs)
	return en_importpage_couldnotread3(inputs)
});
export { importpage_couldnotread3 as "importPage.couldNotRead" }