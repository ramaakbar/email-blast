/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Compose_Prefilldeletedother2Inputs */

const en_compose_prefilldeletedother2 = /** @type {(inputs: Compose_Prefilldeletedother2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} previously failed recipients were deleted.`)
};

const id_compose_prefilldeletedother2 = /** @type {(inputs: Compose_Prefilldeletedother2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} penerima yang sebelumnya gagal telah dihapus.`)
};

/**
* | output |
* | --- |
* | "{count} previously failed recipients were deleted." |
*
* @param {Compose_Prefilldeletedother2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_prefilldeletedother2 = /** @type {((inputs: Compose_Prefilldeletedother2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Prefilldeletedother2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_prefilldeletedother2(inputs)
	return en_compose_prefilldeletedother2(inputs)
});
export { compose_prefilldeletedother2 as "compose.prefillDeletedOther" }