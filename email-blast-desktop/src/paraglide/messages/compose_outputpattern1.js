/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Outputpattern1Inputs */

const en_compose_outputpattern1 = /** @type {(inputs: Compose_Outputpattern1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Output pattern`)
};

const id_compose_outputpattern1 = /** @type {(inputs: Compose_Outputpattern1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pola output`)
};

/**
* | output |
* | --- |
* | "Output pattern" |
*
* @param {Compose_Outputpattern1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_outputpattern1 = /** @type {((inputs?: Compose_Outputpattern1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Outputpattern1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_outputpattern1(inputs)
	return en_compose_outputpattern1(inputs)
});
export { compose_outputpattern1 as "compose.outputPattern" }