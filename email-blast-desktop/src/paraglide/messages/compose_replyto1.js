/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Replyto1Inputs */

const en_compose_replyto1 = /** @type {(inputs: Compose_Replyto1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Reply-to`)
};

const id_compose_replyto1 = /** @type {(inputs: Compose_Replyto1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Balas-ke`)
};

/**
* | output |
* | --- |
* | "Reply-to" |
*
* @param {Compose_Replyto1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_replyto1 = /** @type {((inputs?: Compose_Replyto1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Replyto1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_replyto1(inputs)
	return en_compose_replyto1(inputs)
});
export { compose_replyto1 as "compose.replyTo" }