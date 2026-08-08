/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ slot: NonNullable<unknown>, count: NonNullable<unknown> }} Compose_Slotmissingcountone3Inputs */

const en_compose_slotmissingcountone3 = /** @type {(inputs: Compose_Slotmissingcountone3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.slot} - ${i?.count} recipient`)
};

const id_compose_slotmissingcountone3 = /** @type {(inputs: Compose_Slotmissingcountone3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.slot} - ${i?.count} penerima`)
};

/**
* | output |
* | --- |
* | "{slot} - {count} recipient" |
*
* @param {Compose_Slotmissingcountone3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_slotmissingcountone3 = /** @type {((inputs: Compose_Slotmissingcountone3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Slotmissingcountone3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_slotmissingcountone3(inputs)
	return en_compose_slotmissingcountone3(inputs)
});
export { compose_slotmissingcountone3 as "compose.slotMissingCountOne" }