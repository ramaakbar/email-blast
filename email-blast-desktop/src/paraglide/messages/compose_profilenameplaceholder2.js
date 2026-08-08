/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Profilenameplaceholder2Inputs */

const en_compose_profilenameplaceholder2 = /** @type {(inputs: Compose_Profilenameplaceholder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Profile name, e.g. Gmail utama`)
};

const id_compose_profilenameplaceholder2 = /** @type {(inputs: Compose_Profilenameplaceholder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nama profil, mis. Gmail utama`)
};

/**
* | output |
* | --- |
* | "Profile name, e.g. Gmail utama" |
*
* @param {Compose_Profilenameplaceholder2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_profilenameplaceholder2 = /** @type {((inputs?: Compose_Profilenameplaceholder2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Profilenameplaceholder2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_profilenameplaceholder2(inputs)
	return en_compose_profilenameplaceholder2(inputs)
});
export { compose_profilenameplaceholder2 as "compose.profileNamePlaceholder" }