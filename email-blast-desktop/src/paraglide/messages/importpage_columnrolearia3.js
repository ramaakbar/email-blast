/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ column: NonNullable<unknown> }} Importpage_Columnrolearia3Inputs */

const en_importpage_columnrolearia3 = /** @type {(inputs: Importpage_Columnrolearia3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Role of the "${i?.column}" column`)
};

const id_importpage_columnrolearia3 = /** @type {(inputs: Importpage_Columnrolearia3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Peran kolom "${i?.column}"`)
};

/**
* | output |
* | --- |
* | "Role of the \"{column}\" column" |
*
* @param {Importpage_Columnrolearia3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const importpage_columnrolearia3 = /** @type {((inputs: Importpage_Columnrolearia3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Importpage_Columnrolearia3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_importpage_columnrolearia3(inputs)
	return en_importpage_columnrolearia3(inputs)
});
export { importpage_columnrolearia3 as "importPage.columnRoleAria" }