/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Send_Prefillreenterpassword2Inputs */

const en_send_prefillreenterpassword2 = /** @type {(inputs: Send_Prefillreenterpassword2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Re-enter the app password to send again - passwords never leave this app.`)
};

const id_send_prefillreenterpassword2 = /** @type {(inputs: Send_Prefillreenterpassword2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Masukkan ulang kata sandi aplikasi untuk mengirim lagi - kata sandi tidak pernah keluar dari aplikasi ini.`)
};

/**
* | output |
* | --- |
* | "Re-enter the app password to send again - passwords never leave this app." |
*
* @param {Send_Prefillreenterpassword2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const send_prefillreenterpassword2 = /** @type {((inputs?: Send_Prefillreenterpassword2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Send_Prefillreenterpassword2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_send_prefillreenterpassword2(inputs)
	return en_send_prefillreenterpassword2(inputs)
});
export { send_prefillreenterpassword2 as "send.prefillReenterPassword" }