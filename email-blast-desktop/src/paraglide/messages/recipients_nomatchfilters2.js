/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Recipients_Nomatchfilters2Inputs */

const en_recipients_nomatchfilters2 = /** @type {(inputs: Recipients_Nomatchfilters2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No recipients match your filters`)
};

const id_recipients_nomatchfilters2 = /** @type {(inputs: Recipients_Nomatchfilters2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tidak ada penerima yang cocok dengan filter`)
};

/**
* | output |
* | --- |
* | "No recipients match your filters" |
*
* @param {Recipients_Nomatchfilters2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_nomatchfilters2 = /** @type {((inputs?: Recipients_Nomatchfilters2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Nomatchfilters2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_recipients_nomatchfilters2(inputs)
	return en_recipients_nomatchfilters2(inputs)
});
export { recipients_nomatchfilters2 as "recipients.noMatchFilters" }