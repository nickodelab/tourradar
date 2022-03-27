"use strict";

const logic = {
	/**
	 * Sort
	 * // todo
	 *
	 * @param {string} sortBy
	 * @param {function} callback
	 */
	onSort(sortBy, callback) {
		if (typeof sortBy !== "string")
			throw TypeError(`${sortBy} is not a string`);

		if (!sortBy.trim().length) throw Error("sortBy is empty");

		if (typeof callback !== "function")
			throw TypeError(`${callback} is not a function`);

		tourRadarAPI.onSort(sortBy, callback);
	},

	/**
	 * Filter
	 * // todo
	 *
	 * @param {string} filterBy
	 * @param {function} callback
	 */
	onFilter(filterBy, callback) {
		if (typeof filterBy !== "number")
			throw TypeError(`${filterBy} is not a number/month`);

		// validate month

		if (typeof callback !== "function")
			throw TypeError(`${callback} is not a function`);

		tourRadarAPI.onSort(filterBy, callback);
	},
};
