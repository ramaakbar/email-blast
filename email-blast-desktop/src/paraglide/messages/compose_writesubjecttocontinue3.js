/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Writesubjecttocontinue3Inputs */

const en_compose_writesubjecttocontinue3 = /** @type {(inputs: Compose_Writesubjecttocontinue3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Write a subject to continue`)
};

const id_compose_writesubjecttocontinue3 = /** @type {(inputs: Compose_Writesubjecttocontinue3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tulis subjek untuk melanjutkan`)
};

/**
* | output |
* | --- |
* | "Write a subject to continue" |
*
* @param {Compose_Writesubjecttocontinue3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_writesubjecttocontinue3 = /** @type {((inputs?: Compose_Writesubjecttocontinue3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Writesubjecttocontinue3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_writesubjecttocontinue3(inputs)
	return en_compose_writesubjecttocontinue3(inputs)
});
export { compose_writesubjecttocontinue3 as "compose.writeSubjectToContinue" }