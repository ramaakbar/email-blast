/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compose_Couldnotretryfailures3Inputs */

const en_compose_couldnotretryfailures3 = /** @type {(inputs: Compose_Couldnotretryfailures3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not retry the failures.`)
};

const id_compose_couldnotretryfailures3 = /** @type {(inputs: Compose_Couldnotretryfailures3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tidak dapat mengulang yang gagal.`)
};

/**
* | output |
* | --- |
* | "Could not retry the failures." |
*
* @param {Compose_Couldnotretryfailures3Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_couldnotretryfailures3 = /** @type {((inputs?: Compose_Couldnotretryfailures3Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Couldnotretryfailures3Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_couldnotretryfailures3(inputs)
	return en_compose_couldnotretryfailures3(inputs)
});
export { compose_couldnotretryfailures3 as "compose.couldNotRetryFailures" }