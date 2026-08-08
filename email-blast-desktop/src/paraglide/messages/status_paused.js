/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Status_PausedInputs */

const en_status_paused = /** @type {(inputs: Status_PausedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Paused`)
};

const id_status_paused = /** @type {(inputs: Status_PausedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dijeda`)
};

/**
* | output |
* | --- |
* | "Paused" |
*
* @param {Status_PausedInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const status_paused = /** @type {((inputs?: Status_PausedInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Status_PausedInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_status_paused(inputs)
	return en_status_paused(inputs)
});
export { status_paused as "status.paused" }