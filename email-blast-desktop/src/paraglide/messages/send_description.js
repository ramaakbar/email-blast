/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Send_DescriptionInputs */

const en_send_description = /** @type {(inputs: Send_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Deliver a message to recipients picked from a past Generate Job or straight from the imported list.`)
};

const id_send_description = /** @type {(inputs: Send_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Kirim pesan ke penerima yang dipilih dari Generate Job sebelumnya atau langsung dari daftar impor.`)
};

/**
* | output |
* | --- |
* | "Deliver a message to recipients picked from a past Generate Job or straight from the imported list." |
*
* @param {Send_DescriptionInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const send_description = /** @type {((inputs?: Send_DescriptionInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Send_DescriptionInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_send_description(inputs)
	return en_send_description(inputs)
});
export { send_description as "send.description" }