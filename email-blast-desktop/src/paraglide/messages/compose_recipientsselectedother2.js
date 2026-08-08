/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Compose_Recipientsselectedother2Inputs */

const en_compose_recipientsselectedother2 = /** @type {(inputs: Compose_Recipientsselectedother2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} recipients selected`)
};

const id_compose_recipientsselectedother2 = /** @type {(inputs: Compose_Recipientsselectedother2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} penerima dipilih`)
};

/**
* | output |
* | --- |
* | "{count} recipients selected" |
*
* @param {Compose_Recipientsselectedother2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_recipientsselectedother2 = /** @type {((inputs: Compose_Recipientsselectedother2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Recipientsselectedother2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_recipientsselectedother2(inputs)
	return en_compose_recipientsselectedother2(inputs)
});
export { compose_recipientsselectedother2 as "compose.recipientsSelectedOther" }