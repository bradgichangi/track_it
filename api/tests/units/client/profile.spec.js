const fs = require('fs');
const path = require('path');
global.fetch = require('jest-fetch-mock');
let app = require('../../../../client/assets/js/profile');

describe('requests.js', () => {
    beforeEach(() => {
        fetch.enableMocks();
    })

    afterEach(() => {
        fetch.resetMocks();
    })

    // test display, eventlisteners, results

    test('userId', () => {

    })

});