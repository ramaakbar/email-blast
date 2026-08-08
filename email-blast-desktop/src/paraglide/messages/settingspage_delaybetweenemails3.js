/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Settingspage_Delaybetweenemails3Inputs */

const en_settingspage_delaybetweenemails3 = /** @type {(inputs: Settingspage_Delaybetweenemails3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Delay between emails`)
};

const id_settingspage_delaybetweenemails3 = /** @type {(inputs: Settingspage_Delaybetweenemails3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Jeda antar email`)
};

/**
* | output |
* | --- |
* | "Delay between emails" |
*
* @param {Settingspage_Delaybetweenemails3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const settingspage_delaybetweenemails3 = /** @type {((inputs?: Settingspage_Delaybetweenemails3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settingspage_Delaybetweenemails3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_settingspage_delaybetweenemails3(inputs)
	return en_settingspage_delaybetweenemails3(inputs)
});
export { settingspage_delaybetweenemails3 as "settingsPage.delayBetweenEmails" }