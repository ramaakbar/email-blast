/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Send_AttachmentInputs */

const en_send_attachment = /** @type {(inputs: Send_AttachmentInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Attachment`)
};

const id_send_attachment = /** @type {(inputs: Send_AttachmentInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lampiran`)
};

/**
* | output |
* | --- |
* | "Attachment" |
*
* @param {Send_AttachmentInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const send_attachment = /** @type {((inputs?: Send_AttachmentInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Send_AttachmentInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_send_attachment(inputs)
	return en_send_attachment(inputs)
});
export { send_attachment as "send.attachment" }