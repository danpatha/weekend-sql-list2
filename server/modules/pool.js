const pg = require('pg');
const pool = new pg.Pool(config);

const config = {
    database:'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis:30000
};



pool.on("connect", () => {
    console.log("connected to postgres");
});

pool.on("error", (err) => {
    console.log("error connecting to postgres", err);

});

module.exports = pool;