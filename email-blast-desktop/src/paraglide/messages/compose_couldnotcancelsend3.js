/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Couldnotcancelsend3Inputs */

const en_compose_couldnotcancelsend3 = /** @type {(inputs: Compose_Couldnotcancelsend3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not cancel the send.`)
};

const id_compose_couldnotcancelsend3 = /** @type {(inputs: Compose_Couldnotcancelsend3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tidak dapat membatalkan pengiriman.`)
};

/**
* | output |
* | --- |
* | "Could not cancel the send." |
*
* @param {Compose_Couldnotcancelsend3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_couldnotcancelsend3 = /** @type {((inputs?: Compose_Couldnotcancelsend3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Couldnotcancelsend3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_couldnotcancelsend3(inputs)
	return en_compose_couldnotcancelsend3(inputs)
});
export { compose_couldnotcancelsend3 as "compose.couldNotCancelSend" }