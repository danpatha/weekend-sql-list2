const express = require('express');
const toDo = express.Router();
//Or just put it in one like this,
//const router = require('express').Router();
const pool = require('../modules/pool');

//This is where the database connection is
// GET This sends back to the router our To Do list.
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

toDo.delete('/:id', (req, res) => {
    console.log('in delete with id:  ', req.params.id);
  
        //delete the song from the DB with id
        const sqlText = `DELETE FROM "list" WHERE "id" = $1;`;
        const sqlPrams = [req.params.id];
  
        pool.query(sqlText, sqlPrams)
        .then((dbRes) => {
            res.sendStatus(200);//Good it worked
        })
        .catch((err) => {
            console.log('POST err', err);
            res.sendStatus(500);
        });
  
  });

  toDo.put('/:id', (req, res) => {
    console.log( 'in toDo PUT with id of:', req.params.id);

    let queryText = `UPDATE "list" SET "complete" = TRUE
                    WHERE "id" = $1;`;

    pool 
        .query(queryText, [req.params.id])
        .then((result) => {
            console.log('task is complete!')
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('Error updating ready status', err);
            res.sendStatus(500);
        });
});
  

toDo.post('/', (req, res) => {
    console.log('req.body is:', req.body);

    const sqlText = `
    INSERT INTO "list"
        ("task","estimatedTimeInMin","complete","notes")
    
    VALUES
        ($1,$2,$3,$4)       
    `;

    const sqlParams = [
        req.body.task,
        req.body.estimatedTimeInMin,
        req.body.complete,
        req.body.notes,
    ];

    console.log('in sqlText',sqlText)

    pool.query(sqlText,sqlParams)
        .then((dbRes) =>{
            res.sendStatus(201)
        })
        .catch((err) =>{
            console.log('POST not working',err)
            res.sendStatus(500)
        })
    })








module.exports = toDo;//I needed this to get the npm start to work. 
//Or else there were errors.