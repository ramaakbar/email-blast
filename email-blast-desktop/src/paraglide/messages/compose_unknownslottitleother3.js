/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ list: NonNullable<unknown> }} Compose_Unknownslottitleother3Inputs */

const en_compose_unknownslottitleother3 = /** @type {(inputs: Compose_Unknownslottitleother3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Unknown slots: ${i?.list}`)
};

const id_compose_unknownslottitleother3 = /** @type {(inputs: Compose_Unknownslottitleother3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Slot tidak dikenal: ${i?.list}`)
};

/**
* | output |
* | --- |
* | "Unknown slots: {list}" |
*
* @param {Compose_Unknownslottitleother3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_unknownslottitleother3 = /** @type {((inputs: Compose_Unknownslottitleother3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Unknownslottitleother3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_unknownslottitleother3(inputs)
	return en_compose_unknownslottitleother3(inputs)
});
export { compose_unknownslottitleother3 as "compose.unknownSlotTitleOther" }