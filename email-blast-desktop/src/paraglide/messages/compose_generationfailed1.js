/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Generationfailed1Inputs */

const en_compose_generationfailed1 = /** @type {(inputs: Compose_Generationfailed1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generation failed.`)
};

const id_compose_generationfailed1 = /** @type {(inputs: Compose_Generationfailed1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generate gagal.`)
};

/**
* | output |
* | --- |
* | "Generation failed." |
*
* @param {Compose_Generationfailed1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_generationfailed1 = /** @type {((inputs?: Compose_Generationfailed1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Generationfailed1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_generationfailed1(inputs)
	return en_compose_generationfailed1(inputs)
});
export { compose_generationfailed1 as "compose.generationFailed" }