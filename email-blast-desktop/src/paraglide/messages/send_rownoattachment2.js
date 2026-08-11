/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Send_Rownoattachment2Inputs */

const en_send_rownoattachment2 = /** @type {(inputs: Send_Rownoattachment2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No PDF`)
};

const id_send_rownoattachment2 = /** @type {(inputs: Send_Rownoattachment2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tanpa PDF`)
};

/**
* | output |
* | --- |
* | "No PDF" |
*
* @param {Send_Rownoattachment2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const send_rownoattachment2 = /** @type {((inputs?: Send_Rownoattachment2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Send_Rownoattachment2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_send_rownoattachment2(inputs)
	return en_send_rownoattachment2(inputs)
});
export { send_rownoattachment2 as "send.rowNoAttachment" }