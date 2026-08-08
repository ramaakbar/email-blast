/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Recipients_Deletetitleother2Inputs */

const en_recipients_deletetitleother2 = /** @type {(inputs: Recipients_Deletetitleother2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Delete ${i?.count} recipients?`)
};

const id_recipients_deletetitleother2 = /** @type {(inputs: Recipients_Deletetitleother2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Hapus ${i?.count} penerima?`)
};

/**
* | output |
* | --- |
* | "Delete {count} recipients?" |
*
* @param {Recipients_Deletetitleother2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_deletetitleother2 = /** @type {((inputs: Recipients_Deletetitleother2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Deletetitleother2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_recipients_deletetitleother2(inputs)
	return en_recipients_deletetitleother2(inputs)
});
export { recipients_deletetitleother2 as "recipients.deleteTitleOther" }