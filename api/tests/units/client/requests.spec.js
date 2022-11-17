
const fs = require('fs');
const path = require('path');
global.fetch = require('jest-fetch-mock');
let app = require('../../../../client/assets/js/requests')

describe('requests.js', () => {
    beforeEach(() => {
        fetch.enableMocks();
    })

    afterEach(() => {
        fetch.resetMocks();
    })

    test('it makes a request to https://api.github.com/users/getfutureproof', () => {
        app.getAll();
        expect(fetch).toHaveBeenCalled();
    })

    test('it makes a request to https://api.github.com/users/getfutureproof', () => {
        app.getItem('habit',1);
        expect(fetch).toHaveBeenCalled();
    })

    // test('it makes a request to https://api.github.com/users/getfutureproof', () => {
    //     app.getHabit(1);
    //     expect(fetch).toHaveBeenCalled();
    // })

    test('it makes a request to https://api.github.com/users/getfutureproof', () => {
        app.getUserHabits(1);
        expect(fetch).toHaveBeenCalled();
    })

    test('it makes a request to https://api.github.com/users/getfutureproof', () => {
        app.postHabit({});
        expect(fetch).toHaveBeenCalled();
    })

    // test('returns input', () => {
    //     const rate = app.getName("test")
    //     expect(rate).toEqual("test")
    // })

    // test('Request is sent via API', () => {
    //     app.display()
    //     expect(fetch).toHaveBeenCalled()
    // })

})
