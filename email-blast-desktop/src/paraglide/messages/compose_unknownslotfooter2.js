/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ slot: NonNullable<unknown> }} Compose_Unknownslotfooter2Inputs */

const en_compose_unknownslotfooter2 = /** @type {(inputs: Compose_Unknownslotfooter2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Unknown slot: ${i?.slot}`)
};

const id_compose_unknownslotfooter2 = /** @type {(inputs: Compose_Unknownslotfooter2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Slot tidak dikenal: ${i?.slot}`)
};

/**
* | output |
* | --- |
* | "Unknown slot: {slot}" |
*
* @param {Compose_Unknownslotfooter2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_unknownslotfooter2 = /** @type {((inputs: Compose_Unknownslotfooter2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Unknownslotfooter2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_unknownslotfooter2(inputs)
	return en_compose_unknownslotfooter2(inputs)
});
export { compose_unknownslotfooter2 as "compose.unknownSlotFooter" }