/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sendjob_Keepsending2Inputs */

const en_sendjob_keepsending2 = /** @type {(inputs: Sendjob_Keepsending2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Keep Sending`)
};

const id_sendjob_keepsending2 = /** @type {(inputs: Sendjob_Keepsending2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lanjutkan Mengirim`)
};

/**
* | output |
* | --- |
* | "Keep Sending" |
*
* @param {Sendjob_Keepsending2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_keepsending2 = /** @type {((inputs?: Sendjob_Keepsending2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Keepsending2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_sendjob_keepsending2(inputs)
	return en_sendjob_keepsending2(inputs)
});
export { sendjob_keepsending2 as "sendJob.keepSending" }