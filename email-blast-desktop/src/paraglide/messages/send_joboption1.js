/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ template: NonNullable<unknown>, generated: NonNullable<unknown>, failed: NonNullable<unknown>, stamp: NonNullable<unknown> }} Send_Joboption1Inputs */

const en_send_joboption1 = /** @type {(inputs: Send_Joboption1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.template} · ${i?.generated} generated · ${i?.failed} failed · ${i?.stamp}`)
};

const id_send_joboption1 = /** @type {(inputs: Send_Joboption1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.template} · ${i?.generated} berhasil · ${i?.failed} gagal · ${i?.stamp}`)
};

/**
* | output |
* | --- |
* | "{template} · {generated} generated · {failed} failed · {stamp}" |
*
* @param {Send_Joboption1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const send_joboption1 = /** @type {((inputs: Send_Joboption1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Send_Joboption1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_send_joboption1(inputs)
	return en_send_joboption1(inputs)
});
export { send_joboption1 as "send.jobOption" }