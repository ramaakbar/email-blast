/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Status_SkippedInputs */

const en_status_skipped = /** @type {(inputs: Status_SkippedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Skipped`)
};

const id_status_skipped = /** @type {(inputs: Status_SkippedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dilewati`)
};

/**
* | output |
* | --- |
* | "Skipped" |
*
* @param {Status_SkippedInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const status_skipped = /** @type {((inputs?: Status_SkippedInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Status_SkippedInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_status_skipped(inputs)
	return en_status_skipped(inputs)
});
export { status_skipped as "status.skipped" }