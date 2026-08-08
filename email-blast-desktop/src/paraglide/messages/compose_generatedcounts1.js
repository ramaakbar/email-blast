/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ generated: NonNullable<unknown>, failed: NonNullable<unknown>, pending: NonNullable<unknown> }} Compose_Generatedcounts1Inputs */

const en_compose_generatedcounts1 = /** @type {(inputs: Compose_Generatedcounts1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.generated} generated · ${i?.failed} failed · ${i?.pending} pending`)
};

const id_compose_generatedcounts1 = /** @type {(inputs: Compose_Generatedcounts1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.generated} berhasil · ${i?.failed} gagal · ${i?.pending} menunggu`)
};

/**
* | output |
* | --- |
* | "{generated} generated · {failed} failed · {pending} pending" |
*
* @param {Compose_Generatedcounts1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_generatedcounts1 = /** @type {((inputs: Compose_Generatedcounts1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Generatedcounts1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_generatedcounts1(inputs)
	return en_compose_generatedcounts1(inputs)
});
export { compose_generatedcounts1 as "compose.generatedCounts" }