'use strict';

const toursResults = new ToursResult($('#toursResult'));
const sortSelect = new SortSelect($('#sortBy'));
const filterSelect = new FilterSelect($('#filterBy'));

toursResults.onLoad = () => {
    try {
        logic.onLoad((error, tours) => {
            if (error) sortSelect.error = error.message;

            tours.forEach((tour) => {
                $.get(
                    './templates/tour.html',
                    function (html_string) {
                        const newTour = new Tour($(html_string), tour);
                        toursResults.renderTour(newTour.$el);
                    },
                    'html'
                );
            });
        });
    } catch (err) {
        console.error(err);
    }
};

toursResults.onLoad();

sortSelect.onSort = (sortBy) => {
    try {
        console.log('main - sortSelect - sortBy', sortBy);
        logic.onSort(sortBy, function (error, tours) {
            if (error) sortSelect.error = error.message;
            console.log('tours - MAIN', tours);
            console.log('error - MAIN', error);
            // todo - sort tours
        });
    } catch (err) {
        console.error(err);
    }
};

filterSelect.onFilter = (filterBy) => {
    try {
        console.log('main - filterSelect - filterBy', filterBy);
        logic.onFilter(filterBy, function (error, tours) {
            if (error) filterSelect.error = error.message;
            console.log('tours - MAIN', tours);
            console.log('error - MAIN', error);
            // todo - filter tours
        });
    } catch (err) {
        console.error(err);
    }
};
