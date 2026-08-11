/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Send_Choosejob1Inputs */

const en_send_choosejob1 = /** @type {(inputs: Send_Choosejob1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Choose a Generate Job…`)
};

const id_send_choosejob1 = /** @type {(inputs: Send_Choosejob1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pilih Generate Job…`)
};

/**
* | output |
* | --- |
* | "Choose a Generate Job…" |
*
* @param {Send_Choosejob1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const send_choosejob1 = /** @type {((inputs?: Send_Choosejob1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Send_Choosejob1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_send_choosejob1(inputs)
	return en_send_choosejob1(inputs)
});
export { send_choosejob1 as "send.chooseJob" }