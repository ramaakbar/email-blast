/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Smtp_Editprofiletitle2Inputs */

const en_smtp_editprofiletitle2 = /** @type {(inputs: Smtp_Editprofiletitle2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Edit "${i?.name}"`)
};

const id_smtp_editprofiletitle2 = /** @type {(inputs: Smtp_Editprofiletitle2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Edit "${i?.name}"`)
};

/**
* | output |
* | --- |
* | "Edit \"{name}\"" |
*
* @param {Smtp_Editprofiletitle2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_editprofiletitle2 = /** @type {((inputs: Smtp_Editprofiletitle2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Editprofiletitle2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_smtp_editprofiletitle2(inputs)
	return en_smtp_editprofiletitle2(inputs)
});
export { smtp_editprofiletitle2 as "smtp.editProfileTitle" }