/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Recipients_ImportedInputs */

const en_recipients_imported = /** @type {(inputs: Recipients_ImportedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Imported`)
};

const id_recipients_imported = /** @type {(inputs: Recipients_ImportedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Diimpor`)
};

/**
* | output |
* | --- |
* | "Imported" |
*
* @param {Recipients_ImportedInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_imported = /** @type {((inputs?: Recipients_ImportedInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_ImportedInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_recipients_imported(inputs)
	return en_recipients_imported(inputs)
});
export { recipients_imported as "recipients.imported" }