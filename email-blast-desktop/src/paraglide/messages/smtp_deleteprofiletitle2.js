/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Smtp_Deleteprofiletitle2Inputs */

const en_smtp_deleteprofiletitle2 = /** @type {(inputs: Smtp_Deleteprofiletitle2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Delete "${i?.name}"?`)
};

const id_smtp_deleteprofiletitle2 = /** @type {(inputs: Smtp_Deleteprofiletitle2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Hapus "${i?.name}"?`)
};

/**
* | output |
* | --- |
* | "Delete \"{name}\"?" |
*
* @param {Smtp_Deleteprofiletitle2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_deleteprofiletitle2 = /** @type {((inputs: Smtp_Deleteprofiletitle2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Deleteprofiletitle2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_smtp_deleteprofiletitle2(inputs)
	return en_smtp_deleteprofiletitle2(inputs)
});
export { smtp_deleteprofiletitle2 as "smtp.deleteProfileTitle" }