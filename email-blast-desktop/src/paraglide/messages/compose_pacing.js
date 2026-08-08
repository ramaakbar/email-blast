/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_PacingInputs */

const en_compose_pacing = /** @type {(inputs: Compose_PacingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pacing`)
};

const id_compose_pacing = /** @type {(inputs: Compose_PacingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Kecepatan`)
};

/**
* | output |
* | --- |
* | "Pacing" |
*
* @param {Compose_PacingInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_pacing = /** @type {((inputs?: Compose_PacingInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_PacingInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_pacing(inputs)
	return en_compose_pacing(inputs)
});
export { compose_pacing as "compose.pacing" }