/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Recipients_NameInputs */

const en_recipients_name = /** @type {(inputs: Recipients_NameInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Name`)
};

const id_recipients_name = /** @type {(inputs: Recipients_NameInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nama`)
};

/**
* | output |
* | --- |
* | "Name" |
*
* @param {Recipients_NameInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_name = /** @type {((inputs?: Recipients_NameInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_NameInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_recipients_name(inputs)
	return en_recipients_name(inputs)
});
export { recipients_name as "recipients.name" }