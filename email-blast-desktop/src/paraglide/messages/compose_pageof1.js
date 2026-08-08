/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ page: NonNullable<unknown>, total: NonNullable<unknown> }} Compose_Pageof1Inputs */

const en_compose_pageof1 = /** @type {(inputs: Compose_Pageof1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Page ${i?.page} of ${i?.total}`)
};

const id_compose_pageof1 = /** @type {(inputs: Compose_Pageof1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Halaman ${i?.page} dari ${i?.total}`)
};

/**
* | output |
* | --- |
* | "Page {page} of {total}" |
*
* @param {Compose_Pageof1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const compose_pageof1 = /** @type {((inputs: Compose_Pageof1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compose_Pageof1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_compose_pageof1(inputs)
	return en_compose_pageof1(inputs)
});
export { compose_pageof1 as "compose.pageOf" }