/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sendjob_Chooseoneidentity3Inputs */

const en_sendjob_chooseoneidentity3 = /** @type {(inputs: Sendjob_Chooseoneidentity3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Choose either a saved SMTP profile or enter connection details, not both.`)
};

const id_sendjob_chooseoneidentity3 = /** @type {(inputs: Sendjob_Chooseoneidentity3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pilih profil SMTP tersimpan atau isi detail koneksi, bukan keduanya.`)
};

/**
* | output |
* | --- |
* | "Choose either a saved SMTP profile or enter connection details, not both." |
*
* @param {Sendjob_Chooseoneidentity3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_chooseoneidentity3 = /** @type {((inputs?: Sendjob_Chooseoneidentity3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Chooseoneidentity3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_sendjob_chooseoneidentity3(inputs)
	return en_sendjob_chooseoneidentity3(inputs)
});
export { sendjob_chooseoneidentity3 as "sendJob.chooseOneIdentity" }