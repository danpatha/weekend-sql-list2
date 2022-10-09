const express = require('express');
const toDo = express.Router();
const pool = require('../modules/pool');

//This is where the database connection is

toDo.get('/', (req, res) => {
    console.log('in /list GET');

    pool.query(`
        SELECT * FROM "list"
        ORDER BY "id" ASC;
    `)
        .then((dbRes) => {
            res.send(dbRes.rows);
        })
        .catch((err) => {
            console.log('in router GET /list ERROR', err);
            res.sendStatus(500);
        })
})

// toDo.post('/', (req, res) => {
//     console.log('req.body is:', req.body);

//     const sqlText = `
//     INSERT INTO "list"
//         ("task","estimatedTimeInMin","dateDue","complete","notes")
    
//     VALUES
//         ($1,$2,$3,$4,$5)       
//     `;

//     const sqlParams = [
//         req.body.task,
//         req.body.estimatedTimeInMin,
//         req.body.dateDue,
//         req.body.complete,
//         req.body.notes,
//     ];

//     console.log('in sqlText',sqlText)

//     pool.query(sqlText,sqlParams)
//         .then((dbRes) =>{
//             res.sendStatus(201)
//         })
//         .catch((err) =>{
//             console.log('POST not working',err)
//             res.sendStatus(500)
//         })
//     })








module.exports = toDo;//I needed this to get the npm start to work. 
//Or else there were errors.