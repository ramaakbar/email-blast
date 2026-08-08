/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Smtp_PortInputs */

const en_smtp_port = /** @type {(inputs: Smtp_PortInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Port`)
};

const id_smtp_port = /** @type {(inputs: Smtp_PortInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Port`)
};

/**
* | output |
* | --- |
* | "Port" |
*
* @param {Smtp_PortInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_port = /** @type {((inputs?: Smtp_PortInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_PortInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_smtp_port(inputs)
	return en_smtp_port(inputs)
});
export { smtp_port as "smtp.port" }