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
}

class Tour {
    constructor($el, tour) {
        this.$el = $el;

        const { name, images, reviews, rating, description, operator_name, length, cities, dates, priceFrom } = tour;

        // name
        this.name = name;
        this.renderName(name);

        // images
        this.defaultImageURL = `https://via.placeholder.com/150/818d99/FFFFFF/?text=${name.toUpperCase()}`;
        this.imageURL = this.setPrimaryImage(images);
        this.renderImage();

        // reviews
        this.renderReviews(rating, reviews);

        // description
        this.description = description;
        this.renderDescription(description);

        // operator
        this.operator = operator_name;
        this.renderOperator(operator_name);

        // duration
        this.duration = length;
        this.renderDuration(length);

        // destinations + starts/ends
        this.cities = cities;
        this.renderDestinationsStartEnd(cities);

        // price - from
        this.priceFrom = priceFrom;
        this.renderPriceFrom(priceFrom);
    }

    renderPriceFrom(priceFrom) {
        this.$el.find('#priceFrom').html(`${priceFrom} €`);
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
        this.$el.find('#tourDescription').html(`${description.substring(0, 120)}...`);
    }

    renderName(name) {
        this.$el.find('#tourTitle').html(name);
    }

    renderImage() {
        this.$el.find('img').attr('src', this.imageURL);
        this.$el.find('img').attr('alt', this.name);
    }

    renderReviews(rating, reviewCount) {
        const numberStarsToShow = 5;

        if (rating && reviewCount) {
            // review text
            this.$el.find('#reviewCount').html(`${reviewCount} reviews`);

            let starsHtml = '';
            for (let i = 0; i < Math.floor(rating); i++)
                starsHtml += "<i class='tour__header__reviews__icon material-icons'>star</i>";

            for (let i = 0; i < numberStarsToShow - Math.floor(rating); i++) {
                if (rating % 1 !== 0)
                    starsHtml += "<i class='tour__header__reviews__icon material-icons'>star_half</i>";
                else starsHtml += "<i class='tour__header__reviews__icon material-icons'>star_border</i>";
            }

            this.$el.find('#tourReviewsStarts').append($(starsHtml));
        }
    }

    setPrimaryImage(images) {
        let newImage = images.find((image) => image.is_primary && image.url && image.url.trim().lenght !== 0);
        if (newImage) return newImage.url;

        newImage = images.find((image) => image.url && image.url.trim().lenght !== 0);
        if (newImage) return newImage.url;

        return this.defaultImageURL;
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

    set onFilter(callback) {
        this.__$el__.on('change', () => {
            const filterBy = this.__$el__.find(':selected').data('filter');
            callback(filterBy);
        });
    }
}
