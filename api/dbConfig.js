const { Pool, Client } = require("pg");
const fs = require('fs');

const pool = new Pool({
    host: 'ec2-34-199-68-114.compute-1.amazonaws.com',
    user: 'dpotjxalqbqiwc',
    password: '2635bd8b63e8cd8f5e3d4275d27ecbefb15be528af2c0188b849822678a65b19t',
    database: 'dqla79k8tuif2',
    connectionString: 'postgres://dpotjxalqbqiwc:2635bd8b63e8cd8f5e3d4275d27ecbefb15be528af2c0188b849822678a65b19@ec2-34-199-68-114.compute-1.amazonaws.com:5432/dqla79k8tuif2',
    ssl: {
      rejectUnauthorized: false
    }
  })

const client = new Client({
  host: 'ec2-34-199-68-114.compute-1.amazonaws.com',
  user: 'dpotjxalqbqiwc',
  password: '2635bd8b63e8cd8f5e3d4275d27ecbefb15be528af2c0188b849822678a65b19t',
  database: 'dqla79k8tuif2',
  connectionString: 'postgres://dpotjxalqbqiwc:2635bd8b63e8cd8f5e3d4275d27ecbefb15be528af2c0188b849822678a65b19@ec2-34-199-68-114.compute-1.amazonaws.com:5432/dqla79k8tuif2',
  ssl: {
    rejectUnauthorized: false
  }
})


// client.connect(function(err) {
//     if (err) throw err;
//     console.log("Postgres Client Connected!");
//   });  

// const seeds = fs.readFileSync(__dirname + '/dev_seeds.sql').toString();
// pool.query(seeds, () => console.log('Dev database seeded'));


pool.query(`SELECT * FROM user_habits;`, (err, res) => {
  if (err) {
      console.log("Error - Failed to select all from Users");
      console.log(err);
  }
  else{
      // console.log(res.rows);
  }
});


module.exports = pool;
