/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Senderidentity1Inputs */

const en_compose_senderidentity1 = /** @type {(inputs: Compose_Senderidentity1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sender identity`)
};

const id_compose_senderidentity1 = /** @type {(inputs: Compose_Senderidentity1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Identitas pengirim`)
};

/**
* | output |
* | --- |
* | "Sender identity" |
*
* @param {Compose_Senderidentity1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_senderidentity1 = /** @type {((inputs?: Compose_Senderidentity1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Senderidentity1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_senderidentity1(inputs)
	return en_compose_senderidentity1(inputs)
});
export { compose_senderidentity1 as "compose.senderIdentity" }