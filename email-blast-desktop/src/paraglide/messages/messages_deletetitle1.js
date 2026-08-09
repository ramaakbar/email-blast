/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Messages_Deletetitle1Inputs */

const en_messages_deletetitle1 = /** @type {(inputs: Messages_Deletetitle1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Delete message template "${i?.name}"?`)
};

const id_messages_deletetitle1 = /** @type {(inputs: Messages_Deletetitle1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Hapus template pesan "${i?.name}"?`)
};

/**
* | output |
* | --- |
* | "Delete message template \"{name}\"?" |
*
* @param {Messages_Deletetitle1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const messages_deletetitle1 = /** @type {((inputs: Messages_Deletetitle1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Messages_Deletetitle1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_messages_deletetitle1(inputs)
	return en_messages_deletetitle1(inputs)
});
export { messages_deletetitle1 as "messages.deleteTitle" }