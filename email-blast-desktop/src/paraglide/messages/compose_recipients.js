/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_RecipientsInputs */

const en_compose_recipients = /** @type {(inputs: Compose_RecipientsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Recipients`)
};

const id_compose_recipients = /** @type {(inputs: Compose_RecipientsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Penerima`)
};

/**
* | output |
* | --- |
* | "Recipients" |
*
* @param {Compose_RecipientsInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_recipients = /** @type {((inputs?: Compose_RecipientsInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_RecipientsInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_recipients(inputs)
	return en_compose_recipients(inputs)
});
export { compose_recipients as "compose.recipients" }