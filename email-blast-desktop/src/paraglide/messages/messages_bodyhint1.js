/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Messages_Bodyhint1Inputs */

const en_messages_bodyhint1 = /** @type {(inputs: Messages_Bodyhint1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Recipient fields like ${i?.name} come from your imported recipients and are filled in at send time.`)
};

const id_messages_bodyhint1 = /** @type {(inputs: Messages_Bodyhint1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Kolom penerima seperti ${i?.name} berasal dari penerima yang diimpor dan diisi saat pengiriman.`)
};

/**
* | output |
* | --- |
* | "Recipient fields like {name} come from your imported recipients and are filled in at send time." |
*
* @param {Messages_Bodyhint1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const messages_bodyhint1 = /** @type {((inputs: Messages_Bodyhint1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Messages_Bodyhint1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_messages_bodyhint1(inputs)
	return en_messages_bodyhint1(inputs)
});
export { messages_bodyhint1 as "messages.bodyHint" }