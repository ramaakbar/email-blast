/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sendjob_Nofailedrecipients3Inputs */

const en_sendjob_nofailedrecipients3 = /** @type {(inputs: Sendjob_Nofailedrecipients3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No failed recipients to retry.`)
};

const id_sendjob_nofailedrecipients3 = /** @type {(inputs: Sendjob_Nofailedrecipients3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tidak ada penerima gagal untuk diulang.`)
};

/**
* | output |
* | --- |
* | "No failed recipients to retry." |
*
* @param {Sendjob_Nofailedrecipients3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_nofailedrecipients3 = /** @type {((inputs?: Sendjob_Nofailedrecipients3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Nofailedrecipients3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_sendjob_nofailedrecipients3(inputs)
	return en_sendjob_nofailedrecipients3(inputs)
});
export { sendjob_nofailedrecipients3 as "sendJob.noFailedRecipients" }