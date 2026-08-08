/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Importpage_Rolemetadata2Inputs */

const en_importpage_rolemetadata2 = /** @type {(inputs: Importpage_Rolemetadata2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Metadata`)
};

const id_importpage_rolemetadata2 = /** @type {(inputs: Importpage_Rolemetadata2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Metadata`)
};

/**
* | output |
* | --- |
* | "Metadata" |
*
* @param {Importpage_Rolemetadata2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_rolemetadata2 = /** @type {((inputs?: Importpage_Rolemetadata2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Rolemetadata2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importpage_rolemetadata2(inputs)
	return en_importpage_rolemetadata2(inputs)
});
export { importpage_rolemetadata2 as "importPage.roleMetadata" }