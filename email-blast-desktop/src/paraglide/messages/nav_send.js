/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Nav_SendInputs */

const en_nav_send = /** @type {(inputs: Nav_SendInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Send`)
};

const id_nav_send = /** @type {(inputs: Nav_SendInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Kirim`)
};

/**
* | output |
* | --- |
* | "Send" |
*
* @param {Nav_SendInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const nav_send = /** @type {((inputs?: Nav_SendInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_SendInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_nav_send(inputs)
	return en_nav_send(inputs)
});
export { nav_send as "nav.send" }