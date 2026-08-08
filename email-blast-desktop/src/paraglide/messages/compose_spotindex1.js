/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ index: NonNullable<unknown>, total: NonNullable<unknown> }} Compose_Spotindex1Inputs */

const en_compose_spotindex1 = /** @type {(inputs: Compose_Spotindex1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.index} of ${i?.total}`)
};

const id_compose_spotindex1 = /** @type {(inputs: Compose_Spotindex1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.index} dari ${i?.total}`)
};

/**
* | output |
* | --- |
* | "{index} of {total}" |
*
* @param {Compose_Spotindex1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_spotindex1 = /** @type {((inputs: Compose_Spotindex1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Spotindex1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_spotindex1(inputs)
	return en_compose_spotindex1(inputs)
});
export { compose_spotindex1 as "compose.spotIndex" }