'use strict';

const logic = {
    __tours__: undefined,

    set tours(tours) {
        this.__tours__ = tours;
    },

    /**
     * Add the property 'priceFrom' to every tour
     * calculated based on the cheapest date with availability
     */
    addPriceFrom() {
        this.tours = this.__tours__.map((tour) => {
            // filter by availability
            const availabilityDates = tour.dates.filter(({ availability }) => availability > 0);

            // sort mutates original array
            const datesOrderedByPrice = [...availabilityDates];
            // sort by price
            datesOrderedByPrice.sort((a, b) => a.eur - b.eur);

            return { ...tour, priceFrom: datesOrderedByPrice.length === 0 ? undefined : datesOrderedByPrice[0].eur };
        });
    },

    /**
     * Sort by popularity
     *
     * @param {String} sortBy - "lowest-price" || "highest-price"
     */
    sortByPopularity() {
        // order first by reviews number in descending order
        this.__tours__.sort((a, b) => b.reviews - a.reviews);

        // then we order by rating in descending order
        this.__tours__.sort((a, b) => b.rating - a.rating);
    },

    /**
     * Sort by priceFrom
     *
     * @param {String} sortBy - "lowest-price" || "highest-price"
     */
    sortByPrice(sortBy) {
        if (sortBy !== 'lowest-price' && sortBy !== 'highest-price') throw TypeError(`${sortBy} is not a valid value`);

        // then order by 'priceFrom'
        if (sortBy === 'lowest-price') this.__tours__.sort((a, b) => a.priceFrom - b.priceFrom);
        if (sortBy === 'highest-price') this.__tours__.sort((a, b) => b.priceFrom - a.priceFrom);
    },

    /**
     * Sort tour by duration in days
     *
     * @param {String} sortBy - "shortest-duration" || "longest-duration"
     */
    sortByDuration(sortBy) {
        if (sortBy !== 'shortest-duration' && sortBy !== 'longest-duration')
            throw TypeError(`${sortBy} is not a valid value`);
        if (sortBy === 'shortest-duration') this.__tours__.sort((a, b) => a.length - b.length);
        if (sortBy === 'longest-duration') this.__tours__.sort((a, b) => b.length - a.length);
    },

    /**
     * Load __tours__ property calling to tourRadar API
     *
     * @param {function} callback
     */
    onLoad(callback) {
        if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`);

        tourRadarAPI.onLoad((err, tours) => {
            if (err) callback(err);
            this.tours = tours;

            // add priceFrom to every tour
            this.addPriceFrom();

            // load by default by popularity
            this.sortByPopularity();

            callback(undefined, this.__tours__);
        });
    },

    /**
     * Sort tours by price, popularity or duration
     *
     * @param {String} sortBy == "lowest-price" || "highest-price" || "popularity" || "shortest-duration" || "longest-duration"
     * @param {function} callback
     */
    onSort(sortBy, callback) {
        if (typeof sortBy !== 'string') throw TypeError(`${sortBy} is not a string`);
        if (!sortBy.trim().length) throw Error('sortBy is empty');

        if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`);

        if (sortBy === 'lowest-price' || sortBy === 'highest-price') this.sortByPrice(sortBy);
        if (sortBy === 'shortest-duration' || sortBy === 'longest-duration') this.sortByDuration(sortBy);
        if (sortBy === 'popularity') this.sortByPopularity();

        callback(undefined, this.__tours__);
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
