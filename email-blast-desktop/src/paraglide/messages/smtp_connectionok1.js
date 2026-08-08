/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Smtp_Connectionok1Inputs */

const en_smtp_connectionok1 = /** @type {(inputs: Smtp_Connectionok1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Connection OK - the server accepted the credentials.`)
};

const id_smtp_connectionok1 = /** @type {(inputs: Smtp_Connectionok1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Koneksi OK - server menerima kredensial.`)
};

/**
* | output |
* | --- |
* | "Connection OK - the server accepted the credentials." |
*
* @param {Smtp_Connectionok1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const smtp_connectionok1 = /** @type {((inputs?: Smtp_Connectionok1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Smtp_Connectionok1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_smtp_connectionok1(inputs)
	return en_smtp_connectionok1(inputs)
});
export { smtp_connectionok1 as "smtp.connectionOk" }