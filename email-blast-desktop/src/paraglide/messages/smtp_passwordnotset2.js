/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Smtp_Passwordnotset2Inputs */

const en_smtp_passwordnotset2 = /** @type {(inputs: Smtp_Passwordnotset2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`not set`)
};

const id_smtp_passwordnotset2 = /** @type {(inputs: Smtp_Passwordnotset2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`belum diisi`)
};

/**
* | output |
* | --- |
* | "not set" |
*
* @param {Smtp_Passwordnotset2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_passwordnotset2 = /** @type {((inputs?: Smtp_Passwordnotset2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Passwordnotset2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_smtp_passwordnotset2(inputs)
	return en_smtp_passwordnotset2(inputs)
});
export { smtp_passwordnotset2 as "smtp.passwordNotSet" }