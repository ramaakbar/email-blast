/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_SenderInputs */

const en_compose_sender = /** @type {(inputs: Compose_SenderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sender`)
};

const id_compose_sender = /** @type {(inputs: Compose_SenderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pengirim`)
};

/**
* | output |
* | --- |
* | "Sender" |
*
* @param {Compose_SenderInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_sender = /** @type {((inputs?: Compose_SenderInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_SenderInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_sender(inputs)
	return en_compose_sender(inputs)
});
export { compose_sender as "compose.sender" }