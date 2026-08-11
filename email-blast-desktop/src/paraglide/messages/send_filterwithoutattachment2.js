/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Send_Filterwithoutattachment2Inputs */

const en_send_filterwithoutattachment2 = /** @type {(inputs: Send_Filterwithoutattachment2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Without attachment`)
};

const id_send_filterwithoutattachment2 = /** @type {(inputs: Send_Filterwithoutattachment2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tanpa lampiran`)
};

/**
* | output |
* | --- |
* | "Without attachment" |
*
* @param {Send_Filterwithoutattachment2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const send_filterwithoutattachment2 = /** @type {((inputs?: Send_Filterwithoutattachment2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Send_Filterwithoutattachment2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_send_filterwithoutattachment2(inputs)
	return en_send_filterwithoutattachment2(inputs)
});
export { send_filterwithoutattachment2 as "send.filterWithoutAttachment" }