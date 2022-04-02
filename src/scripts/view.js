class ToursResult {
    constructor($el) {
        this.$toursList = $el;
    }

    clearList() {
        this.$toursList.empty();
    }

    renderTour($tour) {
        toursResults.$toursList.append($tour.clone()).html();
    }
}

class Tour {
    constructor($el) {
        this.$el = $el;
    }

    fillValues({ name, images }) {
        this.name = name;
        this.defaultImageURL = `https://via.placeholder.com/150/818d99/FFFFFF/?text=${name.toUpperCase()}`;
        this.primaryImageURL = this.setPrimaryURL(images);
    }

    setPrimaryURL(images) {
        if (images.length === 0) return this.defaultImageURL;

        let newImage = images.find((image) => image.is_primary && image.url && image.url.trim().lenght !== 0);
        if (newImage) return newImage.url;

        newImage = images.find((image) => image.url && image.url.trim().lenght !== 0);
        if (newImage) return newImage.url;
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

// class SearchPanel extends Panel {
// 	constructor() {
// 		this.__$form__ = this.$container.find("form");
// 		this.__$query__ = this.__$form__.find("input");
// 	}

// 	set onSearch(callback) {
// 		this.__$form__.on("submit", (event) => {
// 			event.preventDefault();
// 			const query = this.__$query__.val();
// 			callback(query);
// 		});
// 	}
// }

// class ArtistsPanel extends Panel {
// 	constructor() {
// 		super(
// 			$(`<section class="results container d-flex flex-column justify-content-center text-center">
//     <h3>Artists</h3>
//     <section class="results__list d-flex flex-row flex-wrap"></section>
// </section`)
// 		);

// 		this.__$list__ = this.$container.find(".results__list");
// 	}

// 	set artists(artists) {
// 		this.__$list__.empty();
// 		let pageNumber;
// 		artists.forEach((artist, index) => {
// 			let artistImage = artist.images.length ? artist.images[1].url : "";
// 			pageNumber = Math.floor(index / 4);
// 			let $item = $(`
//                 <div class="results__list__artist col-6 d-flex flex-column justify-content-center" data-id="${
// 					artist.id
// 				}" data-page="${
// 				pageNumber + 1
// 			}" style="background-image: url('${artistImage}')">
//                     <h4 class="results__list__artist-title">${artist.name}</h4>
//                     <span class="results__list__artist-followers">${
// 						artist.followers.total
// 					}</span>
//                     <span class="results__list__artist-popularity">${
// 						artist.popularity
// 					}</span>
//                     <div class="layer"></div>
//                 </div>`);
// 			this.__$list__.append($item);
// 		});
// 	}

// 	hideShowPage(pageClicked = 1) {
// 		artistsPanel.$container
// 			.find(`div[data-page]`)
// 			.removeClass("mostrar esconder");
// 		artistsPanel.$container
// 			.find(`div[data-page!="${pageClicked}"]`)
// 			.addClass("esconder");
// 		artistsPanel.$container
// 			.find(`div[data-page="${pageClicked}"]`)
// 			.addClass("mostrar");
// 	}
// }

// class PaginationPanel extends Panel {
// 	constructor() {
// 		super(
// 			$(`
//             <nav class="results__list__artist-nav d-flex">
//                 <ul class="pagination justify-content-center">
//                 </ul>
//             </nav>
//         `)
// 		);

// 		this.numberResults = 4;
// 		this.activePage = 1;
// 	}

// 	set onClickPage(callback) {
// 		this.$container.find("a").each((index, pageLink) => {
// 			$(pageLink).on("click", function (event) {
// 				event.preventDefault();
// 				callback(this.text);
// 			});
// 		});
// 	}

// 	set createNavBody(numResults) {
// 		this.$container.empty();

// 		let numPages = numResults / 4;
// 		for (let i = 0; i < numPages; i++) {
// 			var $item = $(
// 				`<li class="page-item"><a class="page-link" href="#">${
// 					i + 1
// 				}</a></li>`
// 			);
// 			if (!i) {
// 				$item.attr("disabled", "disabled");
// 				$item.find(".page-link").attr("aria-disabled", "true");
// 			}
// 			this.$container.append($item);
// 		}
// 	}

// 	disableNav() {
// 		console.log(this.activePage);
// 		let pageClicked = this.activePage;

// 		// removing attr from li and aria-disabled from a
// 		this.$container.find("li").removeAttr("disabled");
// 		this.$container.find("a").removeAttr("aria-disabled");

// 		// adding attr to li and aria-disabled to a
// 		$(this.$container.find("li")[pageClicked - 1]).attr(
// 			"disabled",
// 			"disabled"
// 		);
// 		$(this.$container.find("li")[pageClicked - 1])
// 			.children("a")
// 			.attr("aria-disabled", "true");
// 	}
// }
