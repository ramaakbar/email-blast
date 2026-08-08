/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_RecipientInputs */

const en_compose_recipient = /** @type {(inputs: Compose_RecipientInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Recipient`)
};

const id_compose_recipient = /** @type {(inputs: Compose_RecipientInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Penerima`)
};

/**
* | output |
* | --- |
* | "Recipient" |
*
* @param {Compose_RecipientInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_recipient = /** @type {((inputs?: Compose_RecipientInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_RecipientInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_recipient(inputs)
	return en_compose_recipient(inputs)
});
export { compose_recipient as "compose.recipient" }