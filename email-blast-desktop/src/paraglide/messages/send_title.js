/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Send_TitleInputs */

const en_send_title = /** @type {(inputs: Send_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Send`)
};

const id_send_title = /** @type {(inputs: Send_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Kirim`)
};

/**
* | output |
* | --- |
* | "Send" |
*
* @param {Send_TitleInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const send_title = /** @type {((inputs?: Send_TitleInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Send_TitleInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_send_title(inputs)
	return en_send_title(inputs)
});
export { send_title as "send.title" }