/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Send_Filterwithattachment2Inputs */

const en_send_filterwithattachment2 = /** @type {(inputs: Send_Filterwithattachment2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`With attachment`)
};

const id_send_filterwithattachment2 = /** @type {(inputs: Send_Filterwithattachment2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dengan lampiran`)
};

/**
* | output |
* | --- |
* | "With attachment" |
*
* @param {Send_Filterwithattachment2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const send_filterwithattachment2 = /** @type {((inputs?: Send_Filterwithattachment2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Send_Filterwithattachment2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_send_filterwithattachment2(inputs)
	return en_send_filterwithattachment2(inputs)
});
export { send_filterwithattachment2 as "send.filterWithAttachment" }