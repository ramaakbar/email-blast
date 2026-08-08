/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Saveasprofile2Inputs */

const en_compose_saveasprofile2 = /** @type {(inputs: Compose_Saveasprofile2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Save as profile`)
};

const id_compose_saveasprofile2 = /** @type {(inputs: Compose_Saveasprofile2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Simpan sebagai profil`)
};

/**
* | output |
* | --- |
* | "Save as profile" |
*
* @param {Compose_Saveasprofile2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_saveasprofile2 = /** @type {((inputs?: Compose_Saveasprofile2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Saveasprofile2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_saveasprofile2(inputs)
	return en_compose_saveasprofile2(inputs)
});
export { compose_saveasprofile2 as "compose.saveAsProfile" }