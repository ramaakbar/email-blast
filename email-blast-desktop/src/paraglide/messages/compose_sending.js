/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_SendingInputs */

const en_compose_sending = /** @type {(inputs: Compose_SendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sending…`)
};

const id_compose_sending = /** @type {(inputs: Compose_SendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mengirim…`)
};

/**
* | output |
* | --- |
* | "Sending…" |
*
* @param {Compose_SendingInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_sending = /** @type {((inputs?: Compose_SendingInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_SendingInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_sending(inputs)
	return en_compose_sending(inputs)
});
export { compose_sending as "compose.sending" }