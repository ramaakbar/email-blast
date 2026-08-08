/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Importpage_Couldnotcommit3Inputs */

const en_importpage_couldnotcommit3 = /** @type {(inputs: Importpage_Couldnotcommit3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not commit the import.`)
};

const id_importpage_couldnotcommit3 = /** @type {(inputs: Importpage_Couldnotcommit3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gagal menyimpan impor.`)
};

/**
* | output |
* | --- |
* | "Could not commit the import." |
*
* @param {Importpage_Couldnotcommit3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_couldnotcommit3 = /** @type {((inputs?: Importpage_Couldnotcommit3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Couldnotcommit3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importpage_couldnotcommit3(inputs)
	return en_importpage_couldnotcommit3(inputs)
});
export { importpage_couldnotcommit3 as "importPage.couldNotCommit" }