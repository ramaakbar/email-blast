/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Recipients_Deletetitleone2Inputs */

const en_recipients_deletetitleone2 = /** @type {(inputs: Recipients_Deletetitleone2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Delete ${i?.count} recipient?`)
};

const id_recipients_deletetitleone2 = /** @type {(inputs: Recipients_Deletetitleone2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Hapus ${i?.count} penerima?`)
};

/**
* | output |
* | --- |
* | "Delete {count} recipient?" |
*
* @param {Recipients_Deletetitleone2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_deletetitleone2 = /** @type {((inputs: Recipients_Deletetitleone2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Deletetitleone2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_recipients_deletetitleone2(inputs)
	return en_recipients_deletetitleone2(inputs)
});
export { recipients_deletetitleone2 as "recipients.deleteTitleOne" }