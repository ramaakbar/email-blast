/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Compose_Failedrecipientstitle2Inputs */

const en_compose_failedrecipientstitle2 = /** @type {(inputs: Compose_Failedrecipientstitle2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Failed recipients (${i?.count})`)
};

const id_compose_failedrecipientstitle2 = /** @type {(inputs: Compose_Failedrecipientstitle2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Penerima gagal (${i?.count})`)
};

/**
* | output |
* | --- |
* | "Failed recipients ({count})" |
*
* @param {Compose_Failedrecipientstitle2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_failedrecipientstitle2 = /** @type {((inputs: Compose_Failedrecipientstitle2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Failedrecipientstitle2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_failedrecipientstitle2(inputs)
	return en_compose_failedrecipientstitle2(inputs)
});
export { compose_failedrecipientstitle2 as "compose.failedRecipientsTitle" }