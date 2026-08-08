/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Common_PauseInputs */

const en_common_pause = /** @type {(inputs: Common_PauseInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pause`)
};

const id_common_pause = /** @type {(inputs: Common_PauseInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Jeda`)
};

/**
* | output |
* | --- |
* | "Pause" |
*
* @param {Common_PauseInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const common_pause = /** @type {((inputs?: Common_PauseInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_PauseInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_common_pause(inputs)
	return en_common_pause(inputs)
});
export { common_pause as "common.pause" }