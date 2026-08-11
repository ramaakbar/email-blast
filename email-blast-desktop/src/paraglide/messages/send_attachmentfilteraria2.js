/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Send_Attachmentfilteraria2Inputs */

const en_send_attachmentfilteraria2 = /** @type {(inputs: Send_Attachmentfilteraria2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Filter by attachment`)
};

const id_send_attachmentfilteraria2 = /** @type {(inputs: Send_Attachmentfilteraria2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Filter berdasarkan lampiran`)
};

/**
* | output |
* | --- |
* | "Filter by attachment" |
*
* @param {Send_Attachmentfilteraria2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const send_attachmentfilteraria2 = /** @type {((inputs?: Send_Attachmentfilteraria2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Send_Attachmentfilteraria2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_send_attachmentfilteraria2(inputs)
	return en_send_attachmentfilteraria2(inputs)
});
export { send_attachmentfilteraria2 as "send.attachmentFilterAria" }