/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Recipients_Nomatchhint2Inputs */

const en_recipients_nomatchhint2 = /** @type {(inputs: Recipients_Nomatchhint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Try a different search or batch.`)
};

const id_recipients_nomatchhint2 = /** @type {(inputs: Recipients_Nomatchhint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Coba pencarian atau batch yang lain.`)
};

/**
* | output |
* | --- |
* | "Try a different search or batch." |
*
* @param {Recipients_Nomatchhint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_nomatchhint2 = /** @type {((inputs?: Recipients_Nomatchhint2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Nomatchhint2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_recipients_nomatchhint2(inputs)
	return en_recipients_nomatchhint2(inputs)
});
export { recipients_nomatchhint2 as "recipients.noMatchHint" }