/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Portlabel1Inputs */

const en_compose_portlabel1 = /** @type {(inputs: Compose_Portlabel1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Port (465 = implicit TLS, else STARTTLS)`)
};

const id_compose_portlabel1 = /** @type {(inputs: Compose_Portlabel1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Port (465 = TLS implisit, selain itu STARTTLS)`)
};

/**
* | output |
* | --- |
* | "Port (465 = implicit TLS, else STARTTLS)" |
*
* @param {Compose_Portlabel1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_portlabel1 = /** @type {((inputs?: Compose_Portlabel1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Portlabel1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_portlabel1(inputs)
	return en_compose_portlabel1(inputs)
});
export { compose_portlabel1 as "compose.portLabel" }