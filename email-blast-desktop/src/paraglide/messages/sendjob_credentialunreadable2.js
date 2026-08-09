/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sendjob_Credentialunreadable2Inputs */

const en_sendjob_credentialunreadable2 = /** @type {(inputs: Sendjob_Credentialunreadable2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The stored SMTP credentials for this job could not be decrypted. Re-enter them or recreate the job.`)
};

const id_sendjob_credentialunreadable2 = /** @type {(inputs: Sendjob_Credentialunreadable2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Kredensial SMTP tersimpan untuk pekerjaan ini tidak dapat didekripsi. Masukkan ulang kredensialnya atau buat pekerjaan baru.`)
};

/**
* | output |
* | --- |
* | "The stored SMTP credentials for this job could not be decrypted. Re-enter them or recreate the job." |
*
* @param {Sendjob_Credentialunreadable2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_credentialunreadable2 = /** @type {((inputs?: Sendjob_Credentialunreadable2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Credentialunreadable2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_sendjob_credentialunreadable2(inputs)
	return en_sendjob_credentialunreadable2(inputs)
});
export { sendjob_credentialunreadable2 as "sendJob.credentialUnreadable" }