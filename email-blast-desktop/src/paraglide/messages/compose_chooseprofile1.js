/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Chooseprofile1Inputs */

const en_compose_chooseprofile1 = /** @type {(inputs: Compose_Chooseprofile1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Choose a profile…`)
};

const id_compose_chooseprofile1 = /** @type {(inputs: Compose_Chooseprofile1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pilih profil…`)
};

/**
* | output |
* | --- |
* | "Choose a profile…" |
*
* @param {Compose_Chooseprofile1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_chooseprofile1 = /** @type {((inputs?: Compose_Chooseprofile1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Chooseprofile1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_chooseprofile1(inputs)
	return en_compose_chooseprofile1(inputs)
});
export { compose_chooseprofile1 as "compose.chooseProfile" }