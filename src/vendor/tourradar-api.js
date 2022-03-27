"use strict";

/**
 * TourRadar API client
 *
 * @version 1.0.0
 */
const tourRadarAPI = {
	baseUrl: "https://mocki.io/v1/11356aa2-6371-41d4-9d49-77a5e9e9924f",
	/**
	 * Sort tours.
	 *
	 * @param {string} query
	 * @param {function} callback
	 */
	onSort: function (sortBy, callback) {
		$.getJSON(this.baseUrl, function (tours) {
			console.log("api - onSort - tours", tours);
			callback(undefined, tours);
		}).fail(function (res) {
			if (res.responseJSON && res.responseJSON.error)
				callback(res.responseJSON.error);
			else callback("network error");
		});
	},

	/**
	 * Filter tours.
	 *
	 * @param {string} filterBy
	 * @param {function} callback
	 */
	onFilter: function (filterBy, callback) {
		$.getJSON(this.baseUrl, function (tours) {
			console.log("api - onFilter - tours", tours);
			callback(undefined, tours);
		}).fail(function (res) {
			if (res.responseJSON && res.responseJSON.error)
				callback(res.responseJSON.error);
			else callback("network error");
		});
	},
};
