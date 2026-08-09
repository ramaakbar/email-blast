/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Messages_Countother1Inputs */

const en_messages_countother1 = /** @type {(inputs: Messages_Countother1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} message templates`)
};

const id_messages_countother1 = /** @type {(inputs: Messages_Countother1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} template pesan`)
};

/**
* | output |
* | --- |
* | "{count} message templates" |
*
* @param {Messages_Countother1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const messages_countother1 = /** @type {((inputs: Messages_Countother1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Messages_Countother1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_messages_countother1(inputs)
	return en_messages_countother1(inputs)
});
export { messages_countother1 as "messages.countOther" }