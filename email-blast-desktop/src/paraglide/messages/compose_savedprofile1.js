/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Savedprofile1Inputs */

const en_compose_savedprofile1 = /** @type {(inputs: Compose_Savedprofile1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Saved profile`)
};

const id_compose_savedprofile1 = /** @type {(inputs: Compose_Savedprofile1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Profil tersimpan`)
};

/**
* | output |
* | --- |
* | "Saved profile" |
*
* @param {Compose_Savedprofile1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_savedprofile1 = /** @type {((inputs?: Compose_Savedprofile1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Savedprofile1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_savedprofile1(inputs)
	return en_compose_savedprofile1(inputs)
});
export { compose_savedprofile1 as "compose.savedProfile" }