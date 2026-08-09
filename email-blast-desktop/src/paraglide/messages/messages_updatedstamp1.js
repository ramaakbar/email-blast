/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ stamp: NonNullable<unknown> }} Messages_Updatedstamp1Inputs */

const en_messages_updatedstamp1 = /** @type {(inputs: Messages_Updatedstamp1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Edited ${i?.stamp}`)
};

const id_messages_updatedstamp1 = /** @type {(inputs: Messages_Updatedstamp1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Diedit ${i?.stamp}`)
};

/**
* | output |
* | --- |
* | "Edited {stamp}" |
*
* @param {Messages_Updatedstamp1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const messages_updatedstamp1 = /** @type {((inputs: Messages_Updatedstamp1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Messages_Updatedstamp1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_messages_updatedstamp1(inputs)
	return en_messages_updatedstamp1(inputs)
});
export { messages_updatedstamp1 as "messages.updatedStamp" }