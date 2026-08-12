/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Recipients_UpdatedInputs */

const en_recipients_updated = /** @type {(inputs: Recipients_UpdatedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Recipient updated.`)
};

const id_recipients_updated = /** @type {(inputs: Recipients_UpdatedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Penerima diperbarui.`)
};

/**
* | output |
* | --- |
* | "Recipient updated." |
*
* @param {Recipients_UpdatedInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_updated = /** @type {((inputs?: Recipients_UpdatedInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_UpdatedInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_recipients_updated(inputs)
	return en_recipients_updated(inputs)
});
export { recipients_updated as "recipients.updated" }