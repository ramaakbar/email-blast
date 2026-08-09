/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Messages_Bodydetail1Inputs */

const en_messages_bodydetail1 = /** @type {(inputs: Messages_Bodydetail1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`HTML body`)
};

const id_messages_bodydetail1 = /** @type {(inputs: Messages_Bodydetail1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Isi HTML`)
};

/**
* | output |
* | --- |
* | "HTML body" |
*
* @param {Messages_Bodydetail1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const messages_bodydetail1 = /** @type {((inputs?: Messages_Bodydetail1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Messages_Bodydetail1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_messages_bodydetail1(inputs)
	return en_messages_bodydetail1(inputs)
});
export { messages_bodydetail1 as "messages.bodyDetail" }