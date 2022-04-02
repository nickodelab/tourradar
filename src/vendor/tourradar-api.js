'use strict';

/**
 * TourRadar API client
 *
 * @version 1.0.0
 */
const tourRadarAPI = {
    __baseUrl__: 'https://mocki.io/v1/11356aa2-6371-41d4-9d49-77a5e9e9924f',

    /**
     * Get all tours
     *
     * @param {function} callback
     */
    getTours: function (callback) {
        if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`);

        $.getJSON(this.__baseUrl__, function (tours) {
            callback(undefined, tours);
        }).fail(function (res) {
            if (res.responseJSON && res.responseJSON.error) callback(res.responseJSON.error);
            else callback('network error');
        });
    },
};
