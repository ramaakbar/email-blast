/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_HostInputs */

const en_compose_host = /** @type {(inputs: Compose_HostInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Host`)
};

const id_compose_host = /** @type {(inputs: Compose_HostInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Host`)
};

/**
* | output |
* | --- |
* | "Host" |
*
* @param {Compose_HostInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_host = /** @type {((inputs?: Compose_HostInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_HostInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_host(inputs)
	return en_compose_host(inputs)
});
export { compose_host as "compose.host" }