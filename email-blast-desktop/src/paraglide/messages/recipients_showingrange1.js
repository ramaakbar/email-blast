/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ from: NonNullable<unknown>, to: NonNullable<unknown>, total: NonNullable<unknown> }} Recipients_Showingrange1Inputs */

const en_recipients_showingrange1 = /** @type {(inputs: Recipients_Showingrange1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Showing ${i?.from}-${i?.to} of ${i?.total}`)
};

const id_recipients_showingrange1 = /** @type {(inputs: Recipients_Showingrange1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Menampilkan ${i?.from}-${i?.to} dari ${i?.total}`)
};

/**
* | output |
* | --- |
* | "Showing {from}-{to} of {total}" |
*
* @param {Recipients_Showingrange1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_showingrange1 = /** @type {((inputs: Recipients_Showingrange1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Showingrange1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_recipients_showingrange1(inputs)
	return en_recipients_showingrange1(inputs)
});
export { recipients_showingrange1 as "recipients.showingRange" }