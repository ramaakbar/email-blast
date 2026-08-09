/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Messages_DeletedInputs */

const en_messages_deleted = /** @type {(inputs: Messages_DeletedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Message template deleted.`)
};

const id_messages_deleted = /** @type {(inputs: Messages_DeletedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Template pesan dihapus.`)
};

/**
* | output |
* | --- |
* | "Message template deleted." |
*
* @param {Messages_DeletedInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const messages_deleted = /** @type {((inputs?: Messages_DeletedInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Messages_DeletedInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_messages_deleted(inputs)
	return en_messages_deleted(inputs)
});
export { messages_deleted as "messages.deleted" }