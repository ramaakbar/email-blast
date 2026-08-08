/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Couldnotpausesend3Inputs */

const en_compose_couldnotpausesend3 = /** @type {(inputs: Compose_Couldnotpausesend3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not pause the send.`)
};

const id_compose_couldnotpausesend3 = /** @type {(inputs: Compose_Couldnotpausesend3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tidak dapat menjeda pengiriman.`)
};

/**
* | output |
* | --- |
* | "Could not pause the send." |
*
* @param {Compose_Couldnotpausesend3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_couldnotpausesend3 = /** @type {((inputs?: Compose_Couldnotpausesend3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Couldnotpausesend3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_couldnotpausesend3(inputs)
	return en_compose_couldnotpausesend3(inputs)
});
export { compose_couldnotpausesend3 as "compose.couldNotPauseSend" }