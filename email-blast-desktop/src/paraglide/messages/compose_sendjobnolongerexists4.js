/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Sendjobnolongerexists4Inputs */

const en_compose_sendjobnolongerexists4 = /** @type {(inputs: Compose_Sendjobnolongerexists4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The send job no longer exists.`)
};

const id_compose_sendjobnolongerexists4 = /** @type {(inputs: Compose_Sendjobnolongerexists4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pekerjaan pengiriman sudah tidak ada.`)
};

/**
* | output |
* | --- |
* | "The send job no longer exists." |
*
* @param {Compose_Sendjobnolongerexists4Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_sendjobnolongerexists4 = /** @type {((inputs?: Compose_Sendjobnolongerexists4Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Sendjobnolongerexists4Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_sendjobnolongerexists4(inputs)
	return en_compose_sendjobnolongerexists4(inputs)
});
export { compose_sendjobnolongerexists4 as "compose.sendJobNoLongerExists" }