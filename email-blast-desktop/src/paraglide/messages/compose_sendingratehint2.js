/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Sendingratehint2Inputs */

const en_compose_sendingratehint2 = /** @type {(inputs: Compose_Sendingratehint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Applies live - a running job picks up changes without restarting.`)
};

const id_compose_sendingratehint2 = /** @type {(inputs: Compose_Sendingratehint2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Berlaku langsung - pekerjaan yang berjalan menyesuaikan tanpa perlu di-restart.`)
};

/**
* | output |
* | --- |
* | "Applies live - a running job picks up changes without restarting." |
*
* @param {Compose_Sendingratehint2Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_sendingratehint2 = /** @type {((inputs?: Compose_Sendingratehint2Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Sendingratehint2Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_sendingratehint2(inputs)
	return en_compose_sendingratehint2(inputs)
});
export { compose_sendingratehint2 as "compose.sendingRateHint" }