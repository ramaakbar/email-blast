/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Sendername1Inputs */

const en_compose_sendername1 = /** @type {(inputs: Compose_Sendername1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sender name`)
};

const id_compose_sendername1 = /** @type {(inputs: Compose_Sendername1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nama pengirim`)
};

/**
* | output |
* | --- |
* | "Sender name" |
*
* @param {Compose_Sendername1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_sendername1 = /** @type {((inputs?: Compose_Sendername1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Sendername1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_sendername1(inputs)
	return en_compose_sendername1(inputs)
});
export { compose_sendername1 as "compose.senderName" }