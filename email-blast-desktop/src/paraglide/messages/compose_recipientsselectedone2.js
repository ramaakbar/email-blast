/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Compose_Recipientsselectedone2Inputs */

const en_compose_recipientsselectedone2 = /** @type {(inputs: Compose_Recipientsselectedone2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} recipient selected`)
};

const id_compose_recipientsselectedone2 = /** @type {(inputs: Compose_Recipientsselectedone2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} penerima dipilih`)
};

/**
* | output |
* | --- |
* | "{count} recipient selected" |
*
* @param {Compose_Recipientsselectedone2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_recipientsselectedone2 = /** @type {((inputs: Compose_Recipientsselectedone2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Recipientsselectedone2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_recipientsselectedone2(inputs)
	return en_compose_recipientsselectedone2(inputs)
});
export { compose_recipientsselectedone2 as "compose.recipientsSelectedOne" }