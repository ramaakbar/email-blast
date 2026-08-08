/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Importpage_Rolename2Inputs */

const en_importpage_rolename2 = /** @type {(inputs: Importpage_Rolename2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Name`)
};

const id_importpage_rolename2 = /** @type {(inputs: Importpage_Rolename2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nama`)
};

/**
* | output |
* | --- |
* | "Name" |
*
* @param {Importpage_Rolename2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_rolename2 = /** @type {((inputs?: Importpage_Rolename2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Rolename2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importpage_rolename2(inputs)
	return en_importpage_rolename2(inputs)
});
export { importpage_rolename2 as "importPage.roleName" }