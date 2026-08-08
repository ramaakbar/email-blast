/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Status_CompletedInputs */

const en_status_completed = /** @type {(inputs: Status_CompletedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Completed`)
};

const id_status_completed = /** @type {(inputs: Status_CompletedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Selesai`)
};

/**
* | output |
* | --- |
* | "Completed" |
*
* @param {Status_CompletedInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const status_completed = /** @type {((inputs?: Status_CompletedInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Status_CompletedInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_status_completed(inputs)
	return en_status_completed(inputs)
});
export { status_completed as "status.completed" }