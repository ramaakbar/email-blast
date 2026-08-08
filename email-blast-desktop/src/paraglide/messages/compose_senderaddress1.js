/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Senderaddress1Inputs */

const en_compose_senderaddress1 = /** @type {(inputs: Compose_Senderaddress1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sender address`)
};

const id_compose_senderaddress1 = /** @type {(inputs: Compose_Senderaddress1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Alamat pengirim`)
};

/**
* | output |
* | --- |
* | "Sender address" |
*
* @param {Compose_Senderaddress1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_senderaddress1 = /** @type {((inputs?: Compose_Senderaddress1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Senderaddress1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_senderaddress1(inputs)
	return en_compose_senderaddress1(inputs)
});
export { compose_senderaddress1 as "compose.senderAddress" }