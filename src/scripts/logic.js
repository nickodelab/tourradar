'use strict';

const logic = {
    __tours__: undefined,

    set tours(tours) {
        this.__tours__ = tours;
    },

    sortByPopularity() {
        // order first by reviews number in descending order
        this.__tours__.sort((a, b) => b.reviews - a.reviews);

        // then we order by rating in descending order
        this.__tours__.sort((a, b) => b.rating - a.rating);
    },

    /**
     * onLoad - load first time all tours
     *
     * @param {function} callback
     */
    onLoad(callback) {
        if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`);

        tourRadarAPI.onLoad((err, tours) => {
            if (err) callback(err);
            this.tours = tours;
            this.sortByPopularity();
            callback(undefined, this.__tours__);
        });
    },

    /**
     * Sort
     * // todo
     *
     * @param {string} sortBy
     * @param {function} callback
     */
    onSort(sortBy, callback) {
        if (typeof sortBy !== 'string') throw TypeError(`${sortBy} is not a string`);

        if (!sortBy.trim().length) throw Error('sortBy is empty');

        if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`);

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
        if (typeof filterBy !== 'number') throw TypeError(`${filterBy} is not a number/month`);

        // validate month

        if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`);

        tourRadarAPI.onSort(filterBy, callback);
    },
};
