/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ slot: NonNullable<unknown> }} Messages_Norecipientshint2Inputs */

const en_messages_norecipientshint2 = /** @type {(inputs: Messages_Norecipientshint2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Import recipients first - the ${i?.slot} autocomplete and preview use them.`)
};

const id_messages_norecipientshint2 = /** @type {(inputs: Messages_Norecipientshint2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Impor penerima terlebih dahulu - pelengkapan otomatis ${i?.slot} dan pratinjau menggunakannya.`)
};

/**
* | output |
* | --- |
* | "Import recipients first - the {slot} autocomplete and preview use them." |
*
* @param {Messages_Norecipientshint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const messages_norecipientshint2 = /** @type {((inputs: Messages_Norecipientshint2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Messages_Norecipientshint2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_messages_norecipientshint2(inputs)
	return en_messages_norecipientshint2(inputs)
});
export { messages_norecipientshint2 as "messages.noRecipientsHint" }