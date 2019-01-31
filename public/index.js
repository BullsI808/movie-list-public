//variables

const postTitle = document.querySelector('#postName');
const postGenre = document.querySelector('#postGenre');
const postReleaseDate = document.querySelector('#postReleaseDate');
const btn1 = document.querySelector('#submit');
const deleteId = document.querySelector('#deleteId');
const deletebtn = document.querySelector('#deletebtn');
// get movies, basically a home page



axios
    .get('https://j4m4803yml.execute-api.us-west-2.amazonaws.com/dev/getMovies')
    .then(
        function(response){
            console.log('response', response);
            result.innerHTML = response.data.message.rows.map(rows =>{
               return `
               <div>title: ${rows.movie_title}</div>
               <br>
               <div>genre: ${rows.movie_genre}</div>
               <br>
               <div>release date: ${rows.movie_release_date}</div>
               <br>
               <br>
               `
           })
           .join('');
     })
     .catch(function(err){
         console.log('err', err);
     });


// post movie, adds a new movie

btn1.addEventListener('click', ()=>{
    let data = {
        movie_title: postTitle.value,
        movie_genre: postGenre.value,
        movie_release_date: Number(postReleaseDate.value)
    };
    console.log('typeof postReleaseDate.value', typeof postReleaseDate.value);
    axios
     .post ('https://j4m4803yml.execute-api.us-west-2.amazonaws.com/dev/postMovie',data)
     .then(data=>{
         console.log('data', data);
     })
})




//delete movie, deletes a movie



deletebtn.addEventListener('click', ()=>{

    axios.delete('https://j4m4803yml.execute-api.us-west-2.amazonaws.com/dev/deleteMovie', {data:{movie_id:deleteId.value}})
    .then(deleteData=>{
        console.log('deleteData', deleteData);
    })
})

