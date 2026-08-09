/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Messages_Edittitle1Inputs */

const en_messages_edittitle1 = /** @type {(inputs: Messages_Edittitle1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Edit ${i?.name}`)
};

const id_messages_edittitle1 = /** @type {(inputs: Messages_Edittitle1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Edit ${i?.name}`)
};

/**
* | output |
* | --- |
* | "Edit {name}" |
*
* @param {Messages_Edittitle1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const messages_edittitle1 = /** @type {((inputs: Messages_Edittitle1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Messages_Edittitle1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_messages_edittitle1(inputs)
	return en_messages_edittitle1(inputs)
});
export { messages_edittitle1 as "messages.editTitle" }