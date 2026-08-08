/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} App_Backendunreachable1Inputs */

const en_app_backendunreachable1 = /** @type {(inputs: App_Backendunreachable1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Could not reach the app backend. The database may not be ready yet.`)
};

const id_app_backendunreachable1 = /** @type {(inputs: App_Backendunreachable1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tidak dapat menjangkau backend aplikasi. Database mungkin belum siap.`)
};

/**
* | output |
* | --- |
* | "Could not reach the app backend. The database may not be ready yet." |
*
* @param {App_Backendunreachable1Inputs} inputs
* @param {{ locale?: "en" | "id" }} options
* @returns {LocalizedString}
*/
const app_backendunreachable1 = /** @type {((inputs?: App_Backendunreachable1Inputs, options?: { locale?: "en" | "id" }) => LocalizedString) & import('../runtime.js').MessageMetadata<App_Backendunreachable1Inputs, { locale?: "en" | "id" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "id") return id_app_backendunreachable1(inputs)
	return en_app_backendunreachable1(inputs)
});
export { app_backendunreachable1 as "app.backendUnreachable" }