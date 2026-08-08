/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Campaignsummaryhint2Inputs */

const en_compose_campaignsummaryhint2 = /** @type {(inputs: Compose_Campaignsummaryhint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`One PDF per recipient, named by the template's output pattern. Failures are reported per recipient while the rest of the batch continues.`)
};

const id_compose_campaignsummaryhint2 = /** @type {(inputs: Compose_Campaignsummaryhint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Satu PDF per penerima, diberi nama sesuai pola output template. Kegagalan dilaporkan per penerima sementara batch lainnya terus berjalan.`)
};

/**
* | output |
* | --- |
* | "One PDF per recipient, named by the template's output pattern. Failures are reported per recipient while the rest of the batch continues." |
*
* @param {Compose_Campaignsummaryhint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_campaignsummaryhint2 = /** @type {((inputs?: Compose_Campaignsummaryhint2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Campaignsummaryhint2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_campaignsummaryhint2(inputs)
	return en_compose_campaignsummaryhint2(inputs)
});
export { compose_campaignsummaryhint2 as "compose.campaignSummaryHint" }