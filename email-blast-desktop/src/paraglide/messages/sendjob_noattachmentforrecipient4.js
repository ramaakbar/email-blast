/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sendjob_Noattachmentforrecipient4Inputs */

const en_sendjob_noattachmentforrecipient4 = /** @type {(inputs: Sendjob_Noattachmentforrecipient4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No confirmed generated attachment for this recipient.`)
};

const id_sendjob_noattachmentforrecipient4 = /** @type {(inputs: Sendjob_Noattachmentforrecipient4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tidak ada lampiran hasil generate yang terkonfirmasi untuk penerima ini.`)
};

/**
* | output |
* | --- |
* | "No confirmed generated attachment for this recipient." |
*
* @param {Sendjob_Noattachmentforrecipient4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const sendjob_noattachmentforrecipient4 = /** @type {((inputs?: Sendjob_Noattachmentforrecipient4Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sendjob_Noattachmentforrecipient4Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_sendjob_noattachmentforrecipient4(inputs)
	return en_sendjob_noattachmentforrecipient4(inputs)
});
export { sendjob_noattachmentforrecipient4 as "sendJob.noAttachmentForRecipient" }