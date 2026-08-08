/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Preflighthint1Inputs */

const en_compose_preflighthint1 = /** @type {(inputs: Compose_Preflighthint1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The pre-flight checks the SMTP connection and confirms the generated attachments before the first email goes out.`)
};

const id_compose_preflighthint1 = /** @type {(inputs: Compose_Preflighthint1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pemeriksaan awal menguji koneksi SMTP dan memastikan lampiran hasil generate tersedia sebelum email pertama terkirim.`)
};

/**
* | output |
* | --- |
* | "The pre-flight checks the SMTP connection and confirms the generated attachments before the first email goes out." |
*
* @param {Compose_Preflighthint1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_preflighthint1 = /** @type {((inputs?: Compose_Preflighthint1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Preflighthint1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_preflighthint1(inputs)
	return en_compose_preflighthint1(inputs)
});
export { compose_preflighthint1 as "compose.preflightHint" }