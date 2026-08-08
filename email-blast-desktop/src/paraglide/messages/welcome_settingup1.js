/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Welcome_Settingup1Inputs */

const en_welcome_settingup1 = /** @type {(inputs: Welcome_Settingup1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Setting up…`)
};

const id_welcome_settingup1 = /** @type {(inputs: Welcome_Settingup1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Menyiapkan…`)
};

/**
* | output |
* | --- |
* | "Setting up…" |
*
* @param {Welcome_Settingup1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const welcome_settingup1 = /** @type {((inputs?: Welcome_Settingup1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Welcome_Settingup1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_welcome_settingup1(inputs)
	return en_welcome_settingup1(inputs)
});
export { welcome_settingup1 as "welcome.settingUp" }