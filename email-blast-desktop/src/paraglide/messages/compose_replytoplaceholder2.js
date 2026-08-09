/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Replytoplaceholder2Inputs */

const en_compose_replytoplaceholder2 = /** @type {(inputs: Compose_Replytoplaceholder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`e.g. sekretariat@example.org`)
};

const id_compose_replytoplaceholder2 = /** @type {(inputs: Compose_Replytoplaceholder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`mis. sekretariat@example.org`)
};

/**
* | output |
* | --- |
* | "e.g. sekretariat@example.org" |
*
* @param {Compose_Replytoplaceholder2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_replytoplaceholder2 = /** @type {((inputs?: Compose_Replytoplaceholder2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Replytoplaceholder2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_replytoplaceholder2(inputs)
	return en_compose_replytoplaceholder2(inputs)
});
export { compose_replytoplaceholder2 as "compose.replyToPlaceholder" }