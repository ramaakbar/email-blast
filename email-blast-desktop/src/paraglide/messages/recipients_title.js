/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Recipients_TitleInputs */

const en_recipients_title = /** @type {(inputs: Recipients_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Recipients`)
};

const id_recipients_title = /** @type {(inputs: Recipients_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Penerima`)
};

/**
* | output |
* | --- |
* | "Recipients" |
*
* @param {Recipients_TitleInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_title = /** @type {((inputs?: Recipients_TitleInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_TitleInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_recipients_title(inputs)
	return en_recipients_title(inputs)
});
export { recipients_title as "recipients.title" }