/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Recipients_Countindirectoryone3Inputs */

const en_recipients_countindirectoryone3 = /** @type {(inputs: Recipients_Countindirectoryone3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} recipient in the directory`)
};

const id_recipients_countindirectoryone3 = /** @type {(inputs: Recipients_Countindirectoryone3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} penerima di direktori`)
};

/**
* | output |
* | --- |
* | "{count} recipient in the directory" |
*
* @param {Recipients_Countindirectoryone3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_countindirectoryone3 = /** @type {((inputs: Recipients_Countindirectoryone3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Countindirectoryone3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_recipients_countindirectoryone3(inputs)
	return en_recipients_countindirectoryone3(inputs)
});
export { recipients_countindirectoryone3 as "recipients.countInDirectoryOne" }