/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Writebodytocontinue3Inputs */

const en_compose_writebodytocontinue3 = /** @type {(inputs: Compose_Writebodytocontinue3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Write an email body to continue`)
};

const id_compose_writebodytocontinue3 = /** @type {(inputs: Compose_Writebodytocontinue3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tulis isi email untuk melanjutkan`)
};

/**
* | output |
* | --- |
* | "Write an email body to continue" |
*
* @param {Compose_Writebodytocontinue3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_writebodytocontinue3 = /** @type {((inputs?: Compose_Writebodytocontinue3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Writebodytocontinue3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_writebodytocontinue3(inputs)
	return en_compose_writebodytocontinue3(inputs)
});
export { compose_writebodytocontinue3 as "compose.writeBodyToContinue" }