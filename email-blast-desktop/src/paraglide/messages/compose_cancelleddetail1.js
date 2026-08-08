/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ sent: NonNullable<unknown>, skipped: NonNullable<unknown> }} Compose_Cancelleddetail1Inputs */

const en_compose_cancelleddetail1 = /** @type {(inputs: Compose_Cancelleddetail1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.sent} sent, ${i?.skipped} skipped. No one was double-sent. To send to the skipped recipients, go back and start a new send from the same generated PDFs.`)
};

const id_compose_cancelleddetail1 = /** @type {(inputs: Compose_Cancelleddetail1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.sent} terkirim, ${i?.skipped} dilewati. Tidak ada yang terkirim dua kali. Untuk mengirim ke penerima yang dilewati, kembali dan mulai pengiriman baru dari PDF yang sama.`)
};

/**
* | output |
* | --- |
* | "{sent} sent, {skipped} skipped. No one was double-sent. To send to the skipped recipients, go back and start a new send from the same generated PDFs." |
*
* @param {Compose_Cancelleddetail1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_cancelleddetail1 = /** @type {((inputs: Compose_Cancelleddetail1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Cancelleddetail1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_cancelleddetail1(inputs)
	return en_compose_cancelleddetail1(inputs)
});
export { compose_cancelleddetail1 as "compose.cancelledDetail" }