'use strict';

const toursResults = new ToursResult($('#toursResult'));
const sortSelect = new SortSelect($('#sortBy'));
const filterSelect = new FilterSelect($('#filterBy'));

toursResults.onLoad = () => {
    try {
        logic.onLoad((error, tours) => {
            if (error) sortSelect.error = error.message;

            const newTour = new Tour($('#tour'));
            toursResults.clearList();

            tours.forEach((tour) => {
                newTour.fillValues(tour);

                newTour.$el.find('h2').html(tour.name);
                newTour.$el.find('img').attr('src', newTour.primaryImageURL);

                toursResults.renderTour(newTour.$el);
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
