/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Importpage_Importing1Inputs */

const en_importpage_importing1 = /** @type {(inputs: Importpage_Importing1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Importing…`)
};

const id_importpage_importing1 = /** @type {(inputs: Importpage_Importing1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mengimpor…`)
};

/**
* | output |
* | --- |
* | "Importing…" |
*
* @param {Importpage_Importing1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_importing1 = /** @type {((inputs?: Importpage_Importing1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Importing1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importpage_importing1(inputs)
	return en_importpage_importing1(inputs)
});
export { importpage_importing1 as "importPage.importing" }