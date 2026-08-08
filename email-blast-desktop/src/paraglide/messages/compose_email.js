/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_EmailInputs */

const en_compose_email = /** @type {(inputs: Compose_EmailInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Email`)
};

const id_compose_email = /** @type {(inputs: Compose_EmailInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Email`)
};

/**
* | output |
* | --- |
* | "Email" |
*
* @param {Compose_EmailInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_email = /** @type {((inputs?: Compose_EmailInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_EmailInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_email(inputs)
	return en_compose_email(inputs)
});
export { compose_email as "compose.email" }