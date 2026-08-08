/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Settingslink1Inputs */

const en_compose_settingslink1 = /** @type {(inputs: Compose_Settingslink1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Settings`)
};

const id_compose_settingslink1 = /** @type {(inputs: Compose_Settingslink1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pengaturan`)
};

/**
* | output |
* | --- |
* | "Settings" |
*
* @param {Compose_Settingslink1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_settingslink1 = /** @type {((inputs?: Compose_Settingslink1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Settingslink1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_settingslink1(inputs)
	return en_compose_settingslink1(inputs)
});
export { compose_settingslink1 as "compose.settingsLink" }