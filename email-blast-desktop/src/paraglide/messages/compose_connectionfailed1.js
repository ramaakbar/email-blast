/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Connectionfailed1Inputs */

const en_compose_connectionfailed1 = /** @type {(inputs: Compose_Connectionfailed1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Connection failed.`)
};

const id_compose_connectionfailed1 = /** @type {(inputs: Compose_Connectionfailed1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Koneksi gagal.`)
};

/**
* | output |
* | --- |
* | "Connection failed." |
*
* @param {Compose_Connectionfailed1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_connectionfailed1 = /** @type {((inputs?: Compose_Connectionfailed1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Connectionfailed1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_connectionfailed1(inputs)
	return en_compose_connectionfailed1(inputs)
});
export { compose_connectionfailed1 as "compose.connectionFailed" }