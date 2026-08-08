/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_NameInputs */

const en_compose_name = /** @type {(inputs: Compose_NameInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Name`)
};

const id_compose_name = /** @type {(inputs: Compose_NameInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nama`)
};

/**
* | output |
* | --- |
* | "Name" |
*
* @param {Compose_NameInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_name = /** @type {((inputs?: Compose_NameInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_NameInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_name(inputs)
	return en_compose_name(inputs)
});
export { compose_name as "compose.name" }