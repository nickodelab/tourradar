describe('logic', function () {
    beforeEach(function () {
        // call to getTour in API and fill state in logic
    });

    it('should succeed on getting all tours', function (done) {
        logic.onLoad(function (error, tours) {
            expect(error).toBeUndefined();

            expect(tours).toBeDefined();
            expect(tours instanceof Array).toBeTruthy();
            expect(tours.length).toBeGreaterThan(0);

            tours.forEach((tour) => {
                expect(typeof tour.name).toBe('string');
                // todo - test deeper tours properties
            });
            done();
        });
    });

    it('should succeed on sorting by popularity', function () {
        // todo
        expect(true).toBeTruthy();
    });

    it('should succeed on sorting by price - ascending', function () {
        // todo
        expect(true).toBeTruthy();
    });

    it('should succeed on sorting by price - descending', function () {
        // todo
        expect(true).toBeTruthy();
    });

    it('should succeed on sorting by duration - shortest first', function () {
        // todo
        expect(true).toBeTruthy();
    });

    it('should succeed on sorting by duration - longest first', function () {
        // todo
        expect(true).toBeTruthy();
    });

    it('should fail on sortBy value', function () {
        expect(function () {
            logic.onSort([], function () {});
        }).toThrow(TypeError([] + ' is not a string'));
    });
});
