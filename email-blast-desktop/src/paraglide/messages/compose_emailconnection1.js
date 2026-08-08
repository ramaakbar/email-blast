/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Emailconnection1Inputs */

const en_compose_emailconnection1 = /** @type {(inputs: Compose_Emailconnection1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Email connection`)
};

const id_compose_emailconnection1 = /** @type {(inputs: Compose_Emailconnection1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Koneksi email`)
};

/**
* | output |
* | --- |
* | "Email connection" |
*
* @param {Compose_Emailconnection1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_emailconnection1 = /** @type {((inputs?: Compose_Emailconnection1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Emailconnection1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_emailconnection1(inputs)
	return en_compose_emailconnection1(inputs)
});
export { compose_emailconnection1 as "compose.emailConnection" }