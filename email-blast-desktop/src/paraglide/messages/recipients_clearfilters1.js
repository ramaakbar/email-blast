/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Recipients_Clearfilters1Inputs */

const en_recipients_clearfilters1 = /** @type {(inputs: Recipients_Clearfilters1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Clear filters`)
};

const id_recipients_clearfilters1 = /** @type {(inputs: Recipients_Clearfilters1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bersihkan filter`)
};

/**
* | output |
* | --- |
* | "Clear filters" |
*
* @param {Recipients_Clearfilters1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_clearfilters1 = /** @type {((inputs?: Recipients_Clearfilters1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Clearfilters1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_recipients_clearfilters1(inputs)
	return en_recipients_clearfilters1(inputs)
});
export { recipients_clearfilters1 as "recipients.clearFilters" }