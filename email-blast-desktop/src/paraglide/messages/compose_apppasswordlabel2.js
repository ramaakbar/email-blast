/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Apppasswordlabel2Inputs */

const en_compose_apppasswordlabel2 = /** @type {(inputs: Compose_Apppasswordlabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`App password`)
};

const id_compose_apppasswordlabel2 = /** @type {(inputs: Compose_Apppasswordlabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Kata sandi aplikasi`)
};

/**
* | output |
* | --- |
* | "App password" |
*
* @param {Compose_Apppasswordlabel2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_apppasswordlabel2 = /** @type {((inputs?: Compose_Apppasswordlabel2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Apppasswordlabel2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_apppasswordlabel2(inputs)
	return en_compose_apppasswordlabel2(inputs)
});
export { compose_apppasswordlabel2 as "compose.appPasswordLabel" }