/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Couldnotresumesend3Inputs */

const en_compose_couldnotresumesend3 = /** @type {(inputs: Compose_Couldnotresumesend3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not resume the send.`)
};

const id_compose_couldnotresumesend3 = /** @type {(inputs: Compose_Couldnotresumesend3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tidak dapat melanjutkan pengiriman.`)
};

/**
* | output |
* | --- |
* | "Could not resume the send." |
*
* @param {Compose_Couldnotresumesend3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_couldnotresumesend3 = /** @type {((inputs?: Compose_Couldnotresumesend3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Couldnotresumesend3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_couldnotresumesend3(inputs)
	return en_compose_couldnotresumesend3(inputs)
});
export { compose_couldnotresumesend3 as "compose.couldNotResumeSend" }