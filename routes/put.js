'use strict';
const Pool = require('pg-pool');
const config = require('../config.json');
const {table, host, database, user, password, port} = config;
const pool = new Pool({
  host,
  database,
  user,
  password,
  port,
  idleTimeoutMillis: 1000
});

module.exports.putMovie = (event, context, callback) => {
console.log('event', event);


let outdatedTitle = event.body.movie_title;
let outdatedReleaseDate = event.body.movie_release_date;
let outdatedGenre = event.body.movie_genre;
let id = event.body.movie_id;


 const updateMovie = `UPDATE ${table} SET movie_title = $1, movie_release_date = $2, movie_genre = $3 WHERE movie_id = $4`;

 pool.connect()
  .then(client =>{
    client.release()
    return client.query(updateMovie, [outdatedTitle, outdatedReleaseDate, outdatedGenre, id])
  })
  .then(res =>{
  
 
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': 'http://127.0.0.1:8080',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      message: res,
      input: event,
    }),
  };

  callback(null , response)
})

.catch(err =>{
  console.log('err', err);
})
  
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};