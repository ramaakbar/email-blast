/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Compose_Allgenerated1Inputs */

const en_compose_allgenerated1 = /** @type {(inputs: Compose_Allgenerated1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`All ${i?.count} PDFs generated.`)
};

const id_compose_allgenerated1 = /** @type {(inputs: Compose_Allgenerated1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Semua ${i?.count} PDF berhasil dibuat.`)
};

/**
* | output |
* | --- |
* | "All {count} PDFs generated." |
*
* @param {Compose_Allgenerated1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_allgenerated1 = /** @type {((inputs: Compose_Allgenerated1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Allgenerated1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_allgenerated1(inputs)
	return en_compose_allgenerated1(inputs)
});
export { compose_allgenerated1 as "compose.allGenerated" }