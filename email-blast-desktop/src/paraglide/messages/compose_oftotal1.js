/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ current: NonNullable<unknown>, total: NonNullable<unknown> }} Compose_Oftotal1Inputs */

const en_compose_oftotal1 = /** @type {(inputs: Compose_Oftotal1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.current} of ${i?.total}`)
};

const id_compose_oftotal1 = /** @type {(inputs: Compose_Oftotal1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.current} dari ${i?.total}`)
};

/**
* | output |
* | --- |
* | "{current} of {total}" |
*
* @param {Compose_Oftotal1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_oftotal1 = /** @type {((inputs: Compose_Oftotal1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Oftotal1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_oftotal1(inputs)
	return en_compose_oftotal1(inputs)
});
export { compose_oftotal1 as "compose.ofTotal" }