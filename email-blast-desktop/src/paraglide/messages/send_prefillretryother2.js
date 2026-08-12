/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Send_Prefillretryother2Inputs */

const en_send_prefillretryother2 = /** @type {(inputs: Send_Prefillretryother2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Retry pre-filled from Logs: ${i?.count} failed recipients, the same message and SMTP.`)
};

const id_send_prefillretryother2 = /** @type {(inputs: Send_Prefillretryother2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} penerima gagal diisi ulang dari Log: pesan dan SMTP yang sama.`)
};

/**
* | output |
* | --- |
* | "Retry pre-filled from Logs: {count} failed recipients, the same message and SMTP." |
*
* @param {Send_Prefillretryother2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const send_prefillretryother2 = /** @type {((inputs: Send_Prefillretryother2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Send_Prefillretryother2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_send_prefillretryother2(inputs)
	return en_send_prefillretryother2(inputs)
});
export { send_prefillretryother2 as "send.prefillRetryOther" }