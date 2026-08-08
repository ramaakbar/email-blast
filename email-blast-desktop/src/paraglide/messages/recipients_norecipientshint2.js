/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Recipients_Norecipientshint2Inputs */

const en_recipients_norecipientshint2 = /** @type {(inputs: Recipients_Norecipientshint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Import an Excel file to fill the directory.`)
};

const id_recipients_norecipientshint2 = /** @type {(inputs: Recipients_Norecipientshint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Impor file Excel untuk mengisi direktori.`)
};

/**
* | output |
* | --- |
* | "Import an Excel file to fill the directory." |
*
* @param {Recipients_Norecipientshint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_norecipientshint2 = /** @type {((inputs?: Recipients_Norecipientshint2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Norecipientshint2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_recipients_norecipientshint2(inputs)
	return en_recipients_norecipientshint2(inputs)
});
export { recipients_norecipientshint2 as "recipients.noRecipientsHint" }