/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_PhoneInputs */

const en_compose_phone = /** @type {(inputs: Compose_PhoneInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Phone`)
};

const id_compose_phone = /** @type {(inputs: Compose_PhoneInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Telepon`)
};

/**
* | output |
* | --- |
* | "Phone" |
*
* @param {Compose_PhoneInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_phone = /** @type {((inputs?: Compose_PhoneInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_PhoneInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_phone(inputs)
	return en_compose_phone(inputs)
});
export { compose_phone as "compose.phone" }