/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Smtp_Noprofilesdescription2Inputs */

const en_smtp_noprofilesdescription2 = /** @type {(inputs: Smtp_Noprofilesdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Save your SMTP server details once (e.g. Gmail with an app password) and reuse them for every campaign.`)
};

const id_smtp_noprofilesdescription2 = /** @type {(inputs: Smtp_Noprofilesdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Simpan detail server SMTP sekali (mis. Gmail dengan app password) dan pakai ulang untuk setiap kampanye.`)
};

/**
* | output |
* | --- |
* | "Save your SMTP server details once (e.g. Gmail with an app password) and reuse them for every campaign." |
*
* @param {Smtp_Noprofilesdescription2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_noprofilesdescription2 = /** @type {((inputs?: Smtp_Noprofilesdescription2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Noprofilesdescription2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_smtp_noprofilesdescription2(inputs)
	return en_smtp_noprofilesdescription2(inputs)
});
export { smtp_noprofilesdescription2 as "smtp.noProfilesDescription" }