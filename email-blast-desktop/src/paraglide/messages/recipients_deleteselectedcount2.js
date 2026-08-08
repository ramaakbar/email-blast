/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Recipients_Deleteselectedcount2Inputs */

const en_recipients_deleteselectedcount2 = /** @type {(inputs: Recipients_Deleteselectedcount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Delete selected (${i?.count})`)
};

const id_recipients_deleteselectedcount2 = /** @type {(inputs: Recipients_Deleteselectedcount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Hapus yang dipilih (${i?.count})`)
};

/**
* | output |
* | --- |
* | "Delete selected ({count})" |
*
* @param {Recipients_Deleteselectedcount2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const recipients_deleteselectedcount2 = /** @type {((inputs: Recipients_Deleteselectedcount2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Recipients_Deleteselectedcount2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_recipients_deleteselectedcount2(inputs)
	return en_recipients_deleteselectedcount2(inputs)
});
export { recipients_deleteselectedcount2 as "recipients.deleteSelectedCount" }