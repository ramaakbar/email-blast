/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Messages_RegisteredInputs */

const en_messages_registered = /** @type {(inputs: Messages_RegisteredInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Message template "${i?.name}" saved.`)
};

const id_messages_registered = /** @type {(inputs: Messages_RegisteredInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Template pesan "${i?.name}" disimpan.`)
};

/**
* | output |
* | --- |
* | "Message template \"{name}\" saved." |
*
* @param {Messages_RegisteredInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const messages_registered = /** @type {((inputs: Messages_RegisteredInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Messages_RegisteredInputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_messages_registered(inputs)
	return en_messages_registered(inputs)
});
export { messages_registered as "messages.registered" }