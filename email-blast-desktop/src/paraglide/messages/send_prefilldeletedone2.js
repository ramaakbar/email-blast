/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Send_Prefilldeletedone2Inputs */

const en_send_prefilldeletedone2 = /** @type {(inputs: Send_Prefilldeletedone2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} previously failed recipient was deleted.`)
};

const id_send_prefilldeletedone2 = /** @type {(inputs: Send_Prefilldeletedone2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} penerima yang sebelumnya gagal telah dihapus.`)
};

/**
* | output |
* | --- |
* | "{count} previously failed recipient was deleted." |
*
* @param {Send_Prefilldeletedone2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const send_prefilldeletedone2 = /** @type {((inputs: Send_Prefilldeletedone2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Send_Prefilldeletedone2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_send_prefilldeletedone2(inputs)
	return en_send_prefilldeletedone2(inputs)
});
export { send_prefilldeletedone2 as "send.prefillDeletedOne" }