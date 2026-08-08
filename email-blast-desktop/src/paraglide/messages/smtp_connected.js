/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Smtp_ConnectedInputs */

const en_smtp_connected = /** @type {(inputs: Smtp_ConnectedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Connected - the server accepted these credentials.`)
};

const id_smtp_connected = /** @type {(inputs: Smtp_ConnectedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Terhubung - server menerima kredensial ini.`)
};

/**
* | output |
* | --- |
* | "Connected - the server accepted these credentials." |
*
* @param {Smtp_ConnectedInputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_connected = /** @type {((inputs?: Smtp_ConnectedInputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_ConnectedInputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_smtp_connected(inputs)
	return en_smtp_connected(inputs)
});
export { smtp_connected as "smtp.connected" }