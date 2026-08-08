/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Spotcheck1Inputs */

const en_compose_spotcheck1 = /** @type {(inputs: Compose_Spotcheck1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Spot-check`)
};

const id_compose_spotcheck1 = /** @type {(inputs: Compose_Spotcheck1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pemeriksaan spot`)
};

/**
* | output |
* | --- |
* | "Spot-check" |
*
* @param {Compose_Spotcheck1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_spotcheck1 = /** @type {((inputs?: Compose_Spotcheck1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Spotcheck1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_spotcheck1(inputs)
	return en_compose_spotcheck1(inputs)
});
export { compose_spotcheck1 as "compose.spotCheck" }