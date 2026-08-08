/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Norecipientshint2Inputs */

const en_compose_norecipientshint2 = /** @type {(inputs: Compose_Norecipientshint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Import an Excel file first, then come back here to build a campaign.`)
};

const id_compose_norecipientshint2 = /** @type {(inputs: Compose_Norecipientshint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Impor file Excel dulu, lalu kembali ke sini untuk membuat kampanye.`)
};

/**
* | output |
* | --- |
* | "Import an Excel file first, then come back here to build a campaign." |
*
* @param {Compose_Norecipientshint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_norecipientshint2 = /** @type {((inputs?: Compose_Norecipientshint2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Norecipientshint2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_norecipientshint2(inputs)
	return en_compose_norecipientshint2(inputs)
});
export { compose_norecipientshint2 as "compose.noRecipientsHint" }