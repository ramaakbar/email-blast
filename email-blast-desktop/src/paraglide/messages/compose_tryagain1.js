/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Tryagain1Inputs */

const en_compose_tryagain1 = /** @type {(inputs: Compose_Tryagain1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Try again`)
};

const id_compose_tryagain1 = /** @type {(inputs: Compose_Tryagain1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Coba lagi`)
};

/**
* | output |
* | --- |
* | "Try again" |
*
* @param {Compose_Tryagain1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_tryagain1 = /** @type {((inputs?: Compose_Tryagain1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Tryagain1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_tryagain1(inputs)
	return en_compose_tryagain1(inputs)
});
export { compose_tryagain1 as "compose.tryAgain" }