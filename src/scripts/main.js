"use strict";

const sortSelect = new SortSelect($("#sortBy"));
const filterSelect = new FilterSelect($("#filterBy"));

// const toursPanel = new ToursPanel();

sortSelect.onSort = (sortBy) => {
	try {
		console.log("main - sortSelect - sortBy", sortBy);
		logic.onSort(sortBy, function (error, tours) {
			if (error) sortSelect.error = error.message;
			console.log("tours - MAIN", tours);
			console.log("error - MAIN", error);
			// todo - sort tours
		});
	} catch (err) {
		console.error(err);
	}
};

filterSelect.onFilter = (filterBy) => {
	try {
		console.log("main - filterSelect - filterBy", filterBy);
		logic.onFilter(filterBy, function (error, tours) {
			if (error) filterSelect.error = error.message;
			console.log("tours - MAIN", tours);
			console.log("error - MAIN", error);
			// todo - filter tours
		});
	} catch (err) {
		console.error(err);
	}
};
