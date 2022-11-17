const request = require('supertest');
const fs = require("fs");
const { Pool } = require('pg');
const app = require('../../server');

// reads a file and returns as string
const testSeed = fs.readFileSync(__dirname + '/test_seeds.sql').toString();

const resetTestDB = () => {
    return new Promise (async (resolve, reject) => {
        try {
            const db = new Pool() // make new postgres connection
            await db.query(testSeed); // gets the default test data as a query
            resolve('Test DB reset');
        } catch (err) {
            reject(`Test DB could not be reset: ${err} in ${err.file}`);
        };
    });
}

// exports function to global
global.request = request;
global.app = app;
global.resetTestDB = resetTestDB;
global.port = process.env.PORT || 5000;