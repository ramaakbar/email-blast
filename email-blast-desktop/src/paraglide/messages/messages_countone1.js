/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Messages_Countone1Inputs */

const en_messages_countone1 = /** @type {(inputs: Messages_Countone1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} message template`)
};

const id_messages_countone1 = /** @type {(inputs: Messages_Countone1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} template pesan`)
};

/**
* | output |
* | --- |
* | "{count} message template" |
*
* @param {Messages_Countone1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const messages_countone1 = /** @type {((inputs: Messages_Countone1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Messages_Countone1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_messages_countone1(inputs)
	return en_messages_countone1(inputs)
});
export { messages_countone1 as "messages.countOne" }