/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Welcome_Installwith1Inputs */

const en_welcome_installwith1 = /** @type {(inputs: Welcome_Installwith1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Install it with`)
};

const id_welcome_installwith1 = /** @type {(inputs: Welcome_Installwith1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pasang dengan`)
};

/**
* | output |
* | --- |
* | "Install it with" |
*
* @param {Welcome_Installwith1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const welcome_installwith1 = /** @type {((inputs?: Welcome_Installwith1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Welcome_Installwith1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_welcome_installwith1(inputs)
	return en_welcome_installwith1(inputs)
});
export { welcome_installwith1 as "welcome.installWith" }