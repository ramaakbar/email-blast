/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ list: NonNullable<unknown> }} Compose_Unknownslottitleone3Inputs */

const en_compose_unknownslottitleone3 = /** @type {(inputs: Compose_Unknownslottitleone3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Unknown slot: ${i?.list}`)
};

const id_compose_unknownslottitleone3 = /** @type {(inputs: Compose_Unknownslottitleone3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Slot tidak dikenal: ${i?.list}`)
};

/**
* | output |
* | --- |
* | "Unknown slot: {list}" |
*
* @param {Compose_Unknownslottitleone3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_unknownslottitleone3 = /** @type {((inputs: Compose_Unknownslottitleone3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Unknownslottitleone3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_unknownslottitleone3(inputs)
	return en_compose_unknownslottitleone3(inputs)
});
export { compose_unknownslottitleone3 as "compose.unknownSlotTitleOne" }