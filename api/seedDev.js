const db = require('./dbConfig');
const fs = require('fs');

const seeds = fs.readFileSync(__dirname + '/dev_seeds.sql').toString();

db.query(seeds, () => console.log('Dev database seeded'));
