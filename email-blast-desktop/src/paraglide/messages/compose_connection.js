/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_ConnectionInputs */

const en_compose_connection = /** @type {(inputs: Compose_ConnectionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Connection`)
};

const id_compose_connection = /** @type {(inputs: Compose_ConnectionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Koneksi`)
};

/**
* | output |
* | --- |
* | "Connection" |
*
* @param {Compose_ConnectionInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_connection = /** @type {((inputs?: Compose_ConnectionInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_ConnectionInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_connection(inputs)
	return en_compose_connection(inputs)
});
export { compose_connection as "compose.connection" }