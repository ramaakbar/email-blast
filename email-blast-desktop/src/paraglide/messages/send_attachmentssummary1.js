/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ with: NonNullable<unknown>, without: NonNullable<unknown> }} Send_Attachmentssummary1Inputs */

const en_send_attachmentssummary1 = /** @type {(inputs: Send_Attachmentssummary1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.with} with PDF · ${i?.without} without`)
};

const id_send_attachmentssummary1 = /** @type {(inputs: Send_Attachmentssummary1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.with} dengan PDF · ${i?.without} tanpa`)
};

/**
* | output |
* | --- |
* | "{with} with PDF · {without} without" |
*
* @param {Send_Attachmentssummary1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const send_attachmentssummary1 = /** @type {((inputs: Send_Attachmentssummary1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Send_Attachmentssummary1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_send_attachmentssummary1(inputs)
	return en_send_attachmentssummary1(inputs)
});
export { send_attachmentssummary1 as "send.attachmentsSummary" }