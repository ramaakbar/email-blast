/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ list: NonNullable<unknown> }} Compose_Missingslottitle2Inputs */

const en_compose_missingslottitle2 = /** @type {(inputs: Compose_Missingslottitle2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Some recipients are missing data for: ${i?.list}`)
};

const id_compose_missingslottitle2 = /** @type {(inputs: Compose_Missingslottitle2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Beberapa penerima kekurangan data untuk: ${i?.list}`)
};

/**
* | output |
* | --- |
* | "Some recipients are missing data for: {list}" |
*
* @param {Compose_Missingslottitle2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_missingslottitle2 = /** @type {((inputs: Compose_Missingslottitle2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Missingslottitle2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_missingslottitle2(inputs)
	return en_compose_missingslottitle2(inputs)
});
export { compose_missingslottitle2 as "compose.missingSlotTitle" }