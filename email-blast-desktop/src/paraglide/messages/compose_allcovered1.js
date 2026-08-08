/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Compose_Allcovered1Inputs */

const en_compose_allcovered1 = /** @type {(inputs: Compose_Allcovered1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`All ${i?.count} selected recipients have data for every required slot.`)
};

const id_compose_allcovered1 = /** @type {(inputs: Compose_Allcovered1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Semua ${i?.count} penerima terpilih memiliki data untuk setiap slot wajib.`)
};

/**
* | output |
* | --- |
* | "All {count} selected recipients have data for every required slot." |
*
* @param {Compose_Allcovered1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_allcovered1 = /** @type {((inputs: Compose_Allcovered1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Allcovered1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_allcovered1(inputs)
	return en_compose_allcovered1(inputs)
});
export { compose_allcovered1 as "compose.allCovered" }