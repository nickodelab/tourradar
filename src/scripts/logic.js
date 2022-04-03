'use strict';

const logic = {
    __tours__: undefined,
    __defaultImageURL__: `https://via.placeholder.com/150/818d99/FFFFFF/?text=`,

    set tours(tours) {
        this.__tours__ = tours;
    },

    /**
     * Add the property 'priceFrom' to every tour
     * calculated based on the cheapest date with availability
     *
     * priceFrom can be undefined
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
     * Add the property 'primaryImageURL' to every tour
     * calculated based on all values for tour.images
     * {...tour, primaryImageURL: "https:..." }
     *
     * priceFrom can be undefined
     */

    addPrimaryImageURL() {
        this.__tours__ = this.__tours__.map((tour) => {
            // images can be []
            if (tour.images.length === 0)
                return {
                    ...tour,
                    primaryImageURL: this.__defaultImageURL__ + tour.name,
                };

            // search for primary image with valid url
            let newImage = tour.images.find((image) => image.is_primary && image.url && image.url.trim().length !== 0);
            if (newImage) return { ...tour, primaryImageURL: newImage.url };

            // search for any images valid
            newImage = tour.images.find((image) => image.url && image.url.trim().length !== 0);
            return { ...tour, primaryImageURL: newImage.url };
        });
    },

    addAvailableSpaces() {
        this.__tours__ = this.__tours__.map((tour) => {
            // filter by availability
            const availabilityDates = tour.dates.filter(({ availability }) => availability > 0);

            // order by start date
            // sort mutates original array
            const datesOrderedByDate = [...availabilityDates];

            // sort by price
            datesOrderedByDate.sort((a, b) => moment(a.start).format('x') - moment(b.start).format('x'));

            // ie. '{date: '30 Mar 2017', month: 'March', spaces: 8}'
            const spacesByDate = datesOrderedByDate.map((dateInfo) => ({
                date: moment(dateInfo.start).format('DD MMM YYYY'),
                month: moment(dateInfo.start).format('MMMM'),
                spaces: dateInfo.availability,
                departureMonth: moment(dateInfo.start).format('MMMM YYYY'),
            }));

            return { ...tour, spacesByDate };
        });
    },

    /**
     * Sort by popularity
     *
     * @param {String} sortBy - "lowest-price" || "highest-price"
     */
    sortByPopularity() {
        // add reviews and rating to 0 in the tour doesn't have it
        this.__tours__ = this.__tours__.map((tour) => ({ ...tour, rating: tour.rating || 0, reviews: tour.reviews || 0 }));

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
        if (sortBy !== 'shortest-duration' && sortBy !== 'longest-duration') throw TypeError(`${sortBy} is not a valid value`);
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

        tourRadarAPI.getTours((err, tours) => {
            if (err) callback(err);
            this.tours = tours;

            // add priceFrom to every tour
            this.addPriceFrom();

            // add primaryImageURL to every tour
            this.addPrimaryImageURL();

            // add availableSpaces to every tour
            this.addAvailableSpaces();

            // load by default by popularity
            // todo - call sortByPopularity only once
            this.sortByPopularity();

            console.log(this.__tours__);

            callback(undefined, this.__tours__, this.toursData());
        });
    },

    toursData() {
        const toursByMonth = [];

        this.__tours__.map((tour) => {
            const spacesByUniqueMonth = tour.spacesByDate.reduce((acc, current) => {
                if (!acc.some(({ month }) => month === current.month)) return [...acc, current];
                return acc;
            }, []);

            spacesByUniqueMonth.map((spaceByDate) => {
                const monthIndex = toursByMonth.findIndex(({ month }) => month === moment(spaceByDate.date).format('MMMM YYYY'));

                if (monthIndex === -1) toursByMonth.push({ month: moment(spaceByDate.date).format('MMMM YYYY'), toursAvailable: 1 });
                else toursByMonth[monthIndex].toursAvailable = toursByMonth[monthIndex].toursAvailable + 1;
            });
        });

        return toursByMonth;
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
     * Filter tours by departure month
     *
     * @param {string} filterBy
     * @param {function} callback
     */
    onFilter(filterBy, callback) {
        if (typeof filterBy !== 'string') throw TypeError(`${filterBy} is not a month + year`);
        if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`);

        const filteredTours = this.__tours__.filter(({ spacesByDate }) => {
            return spacesByDate.some(({ departureMonth }) => departureMonth === filterBy);
        });

        callback(undefined, filteredTours);
    },
};
