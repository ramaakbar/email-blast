/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sendjob_Noconfirmedattachments3Inputs */

const en_sendjob_noconfirmedattachments3 = /** @type {(inputs: Sendjob_Noconfirmedattachments3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`None of the recipients has a confirmed generated attachment. Generate the PDFs first.`)
};

const id_sendjob_noconfirmedattachments3 = /** @type {(inputs: Sendjob_Noconfirmedattachments3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tidak ada penerima dengan lampiran hasil generate yang terkonfirmasi. Buat PDF-nya dulu.`)
};

/**
* | output |
* | --- |
* | "None of the recipients has a confirmed generated attachment. Generate the PDFs first." |
*
* @param {Sendjob_Noconfirmedattachments3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_noconfirmedattachments3 = /** @type {((inputs?: Sendjob_Noconfirmedattachments3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Noconfirmedattachments3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_sendjob_noconfirmedattachments3(inputs)
	return en_sendjob_noconfirmedattachments3(inputs)
});
export { sendjob_noconfirmedattachments3 as "sendJob.noConfirmedAttachments" }