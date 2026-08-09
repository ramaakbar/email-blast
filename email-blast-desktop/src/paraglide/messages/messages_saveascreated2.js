/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Messages_Saveascreated2Inputs */

const en_messages_saveascreated2 = /** @type {(inputs: Messages_Saveascreated2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Saved as template "${i?.name}".`)
};

const id_messages_saveascreated2 = /** @type {(inputs: Messages_Saveascreated2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Disimpan sebagai template "${i?.name}".`)
};

/**
* | output |
* | --- |
* | "Saved as template \"{name}\"." |
*
* @param {Messages_Saveascreated2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const messages_saveascreated2 = /** @type {((inputs: Messages_Saveascreated2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Messages_Saveascreated2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_messages_saveascreated2(inputs)
	return en_messages_saveascreated2(inputs)
});
export { messages_saveascreated2 as "messages.saveAsCreated" }