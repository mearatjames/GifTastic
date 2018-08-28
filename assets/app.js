//Global Variables
let button = [
    "Monday",
    "Roadtrip",
    "Obama",
    "Avengers",
    "Traffic",
    "Mercia",
    "Trickshot"
]

//Create Button function
function createBtn() {
    for (let i = 0; i < button.length; i++) {
        $('#btn').append(`
        <button type="button" class="gif col-sm-2 btn btn-secondary mr-1 mt-1">${button[i]}</button>
        `);
    }
}

//GiphyAPI Query
function giphy (searchString, rating) {
let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=J9SB4HAWrd8Xn8ZgDkn5edId8003c6OW&q=" + searchString + "&rating=" + rating + "&lang=en";
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response.data);
    for (let i = 0; i < 11; i++) {
        $('#gifCard').append(`
        <div class="card col-sm-6 col-md-4 col-lg-3 mt-2" style="width: 18rem;">
            <img id="giphy" class="card-img-top" src="${response.data[i].images.original.url}" alt="Card image cap">
            <div class="card-body">
                <p class="card-text">Rating: ${response.data[i].rating}</p>
            </div>
        </div>
        `)
    }

  });
}


//Eventlistener
$(function() {
    createBtn()
    $('button.gif').on('click', function() {
        console.log($(this).text())
        $('#gifCard').empty();
        let searchString = $(this).text();
        let rating = "g";
        giphy(searchString, rating)
    })
})