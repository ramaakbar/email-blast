/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Couldnotloadrecipients3Inputs */

const en_compose_couldnotloadrecipients3 = /** @type {(inputs: Compose_Couldnotloadrecipients3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not load recipients.`)
};

const id_compose_couldnotloadrecipients3 = /** @type {(inputs: Compose_Couldnotloadrecipients3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gagal memuat penerima.`)
};

/**
* | output |
* | --- |
* | "Could not load recipients." |
*
* @param {Compose_Couldnotloadrecipients3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_couldnotloadrecipients3 = /** @type {((inputs?: Compose_Couldnotloadrecipients3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Couldnotloadrecipients3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_couldnotloadrecipients3(inputs)
	return en_compose_couldnotloadrecipients3(inputs)
});
export { compose_couldnotloadrecipients3 as "compose.couldNotLoadRecipients" }