/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Waitingfirstemail2Inputs */

const en_compose_waitingfirstemail2 = /** @type {(inputs: Compose_Waitingfirstemail2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Waiting for the first email…`)
};

const id_compose_waitingfirstemail2 = /** @type {(inputs: Compose_Waitingfirstemail2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Menunggu email pertama…`)
};

/**
* | output |
* | --- |
* | "Waiting for the first email…" |
*
* @param {Compose_Waitingfirstemail2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_waitingfirstemail2 = /** @type {((inputs?: Compose_Waitingfirstemail2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Waitingfirstemail2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_waitingfirstemail2(inputs)
	return en_compose_waitingfirstemail2(inputs)
});
export { compose_waitingfirstemail2 as "compose.waitingFirstEmail" }