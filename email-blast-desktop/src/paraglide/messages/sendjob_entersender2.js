/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sendjob_Entersender2Inputs */

const en_sendjob_entersender2 = /** @type {(inputs: Sendjob_Entersender2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Enter the sender name and address.`)
};

const id_sendjob_entersender2 = /** @type {(inputs: Sendjob_Entersender2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Isi nama dan alamat pengirim.`)
};

/**
* | output |
* | --- |
* | "Enter the sender name and address." |
*
* @param {Sendjob_Entersender2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_entersender2 = /** @type {((inputs?: Sendjob_Entersender2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Entersender2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_sendjob_entersender2(inputs)
	return en_sendjob_entersender2(inputs)
});
export { sendjob_entersender2 as "sendJob.enterSender" }