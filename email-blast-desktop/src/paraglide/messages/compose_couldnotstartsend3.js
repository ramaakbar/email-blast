/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Couldnotstartsend3Inputs */

const en_compose_couldnotstartsend3 = /** @type {(inputs: Compose_Couldnotstartsend3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not start the send.`)
};

const id_compose_couldnotstartsend3 = /** @type {(inputs: Compose_Couldnotstartsend3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tidak dapat memulai pengiriman.`)
};

/**
* | output |
* | --- |
* | "Could not start the send." |
*
* @param {Compose_Couldnotstartsend3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_couldnotstartsend3 = /** @type {((inputs?: Compose_Couldnotstartsend3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Couldnotstartsend3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_couldnotstartsend3(inputs)
	return en_compose_couldnotstartsend3(inputs)
});
export { compose_couldnotstartsend3 as "compose.couldNotStartSend" }