/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Messages_Subjectdetail1Inputs */

const en_messages_subjectdetail1 = /** @type {(inputs: Messages_Subjectdetail1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Subject`)
};

const id_messages_subjectdetail1 = /** @type {(inputs: Messages_Subjectdetail1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Subjek`)
};

/**
* | output |
* | --- |
* | "Subject" |
*
* @param {Messages_Subjectdetail1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const messages_subjectdetail1 = /** @type {((inputs?: Messages_Subjectdetail1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Messages_Subjectdetail1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_messages_subjectdetail1(inputs)
	return en_messages_subjectdetail1(inputs)
});
export { messages_subjectdetail1 as "messages.subjectDetail" }