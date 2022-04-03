class Page {
    constructor($el) {
        this.$el = $el;
    }
}

class ToursResult {
    constructor($el) {
        this.$el = $el;
    }

    clearList() {
        this.$el.empty();
    }

    renderTour($tour) {
        toursResults.$el.append($tour);
    }

    renderTours(tours) {
        tours.forEach((tour) => this.renderTour(tour.$el));
    }
}

class Tour {
    constructor($el, tour) {
        this.$el = $el;

        const { name, reviews, rating, description, operator_name, length, cities, priceFrom, primaryImageURL, spacesByDate } = tour;

        // name
        this.name = name;
        this.renderName(name);

        // images
        this.primaryImageURL = primaryImageURL;
        this.renderPrimaryImageURL();

        // reviews
        this.renderReviews(rating, reviews);

        // description
        this.description = description;
        this.renderDescription(description);

        // operator
        this.operator = operator_name;
        this.renderOperator(operator_name);

        // duration in days
        this.duration = length;
        this.renderDuration(length);

        // destinations + starts/ends
        this.cities = cities;
        this.renderDestinationsStartEnd(cities);

        // price - from
        this.priceFrom = priceFrom;
        this.renderPriceFrom(priceFrom);

        // spaces left
        this.spacesByDate = spacesByDate;
        this.renderSpaces(spacesByDate);
    }

    renderSpaces(spacesByDate) {
        let spacesStr = '';
        if (spacesByDate.length === 0) spacesStr = `<dl class='dl'><dt>No available dates</dt></dl>`;
        else {
            spacesStr = `<dl class='dl'><dt>${spacesByDate[0].date}</dt><dd>${spacesByDate[0].spaces} spaces left</dd></dl>`;
            spacesStr += `<dl class='dl'><dt>${spacesByDate[1].date}</dt><dd>${spacesByDate[1].spaces} spaces left</dd></dl>`;
        }
        this.$el.find('#spaces').append($(spacesStr));
    }

    // priceFrom can be undefined
    renderPriceFrom(priceFrom) {
        this.$el.find('#priceFrom').html(`${priceFrom ? priceFrom : '-'} €`);
    }

    renderDestinationsStartEnd(destinations) {
        const cities = destinations.map(({ name }) => name);

        this.$el.find('#destinations').html(cities.slice(0, 3).join(', '));
        this.$el.find('#startsEnds').html(`${cities[0]} / ${cities[cities.length - 1]}`);
    }

    renderDuration(duration) {
        this.$el.find('#duration').html(`${duration} days`);
    }

    renderOperator(operator) {
        this.$el.find('#operator').html(operator);
    }

    renderDescription(description) {
        // show only 120 chars in description
        this.$el.find('#tourDescription').html(`${description.substring(0, 120)}...`);
    }

    renderName(name) {
        this.$el.find('#tourTitle').html(name);
    }

    renderPrimaryImageURL() {
        this.$el.find('img').attr('src', this.primaryImageURL);
        this.$el.find('img').attr('alt', this.name);
    }

    renderReviews(rating, reviewCount) {
        const numberStarsToShow = 5;

        if (rating && reviewCount) {
            this.$el.find('#reviewCount').html(`${reviewCount} reviews`);

            let starsHtml = '';
            for (let i = 0; i < Math.floor(rating); i++) starsHtml += "<i class='tour__header__reviews__icon material-icons'>star</i>";

            for (let i = 0; i < numberStarsToShow - Math.floor(rating); i++) {
                if (rating % 1 !== 0) starsHtml += "<i class='tour__header__reviews__icon material-icons'>star_half</i>";
                else starsHtml += "<i class='tour__header__reviews__icon material-icons'>star_border</i>";
            }

            this.$el.find('#tourReviewsStarts').append($(starsHtml));
        }
    }
}

class SortSelect {
    constructor($el) {
        this.__$el__ = $el;
    }

    set onSort(callback) {
        this.__$el__.on('change', (e) => {
            const sortBy = this.__$el__.find(':selected').data('sort');
            callback(sortBy);
        });
    }
}

class FilterSelect {
    constructor($el) {
        this.__$el__ = $el;
    }

    set dropdownOptions(toursData) {
        const options = toursData.reduce((acc, current) => {
            return (acc += `<option data-filter="${current.month}">${current.month} (${current.toursAvailable} available tours)</option>`);
        }, '');

        this.__$el__.append($(options));
    }

    set onFilter(callback) {
        this.__$el__.on('change', () => {
            const filterBy = this.__$el__.find(':selected').data('filter');
            callback(filterBy);
        });
    }
}
