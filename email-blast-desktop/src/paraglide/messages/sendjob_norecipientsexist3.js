/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sendjob_Norecipientsexist3Inputs */

const en_sendjob_norecipientsexist3 = /** @type {(inputs: Sendjob_Norecipientsexist3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`None of the selected recipients still exist.`)
};

const id_sendjob_norecipientsexist3 = /** @type {(inputs: Sendjob_Norecipientsexist3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tidak ada penerima terpilih yang masih ada.`)
};

/**
* | output |
* | --- |
* | "None of the selected recipients still exist." |
*
* @param {Sendjob_Norecipientsexist3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_norecipientsexist3 = /** @type {((inputs?: Sendjob_Norecipientsexist3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Norecipientsexist3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_sendjob_norecipientsexist3(inputs)
	return en_sendjob_norecipientsexist3(inputs)
});
export { sendjob_norecipientsexist3 as "sendJob.noRecipientsExist" }