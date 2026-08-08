/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sendjob_Selectrecipients2Inputs */

const en_sendjob_selectrecipients2 = /** @type {(inputs: Sendjob_Selectrecipients2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Select at least one recipient to send to.`)
};

const id_sendjob_selectrecipients2 = /** @type {(inputs: Sendjob_Selectrecipients2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pilih minimal satu penerima untuk dikirim.`)
};

/**
* | output |
* | --- |
* | "Select at least one recipient to send to." |
*
* @param {Sendjob_Selectrecipients2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_selectrecipients2 = /** @type {((inputs?: Sendjob_Selectrecipients2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Selectrecipients2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_sendjob_selectrecipients2(inputs)
	return en_sendjob_selectrecipients2(inputs)
});
export { sendjob_selectrecipients2 as "sendJob.selectRecipients" }