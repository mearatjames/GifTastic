
//GiphyAPI Query
function giphy (searchString, rating) {
let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=J9SB4HAWrd8Xn8ZgDkn5edId8003c6OW&q=" + searchString + "&rating=" + rating + "&lang=en";
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    for (let i = 0; i < 10; i++) {
        $('#gifCard').append(`
        <div class="card col-sm-6 col-md-4 col-lg-3 mt-2" style="width: 18rem;">
            <img class="giphy card-img-top" data-index="${i}" src="${response.data[i].images.original_still.url}" alt="Card image cap">
            <div class="card-body">
                <p class="card-text">Rating: ${response.data[i].rating}</p>
            </div>
        </div>
        `)
    }
    $('.giphy').on('click', function() {
        let index = $(this).attr("data-index")
        if ($(this).attr("src") == response.data[index].images.original_still.url) {
            $(this).attr("src", response.data[index].images.original.url)
        } else if ($(this).attr("src") == response.data[index].images.original.url) {
            $(this).attr("src", response.data[index].images.original_still.url)
        }
    })

  });
}

//Document Ready
$(function() {

//Eventlistener
//Search and add function
$('#searchAdd').on('click', function() {
    event.preventDefault();
    $('#btn').append(`
    <div class="gif col-sm-2 btn btn-secondary mr-1 mt-1">
    <div class="row align-items-center">
    <div class="searchvalue col-8">${$('#search').val()}</div>
    <div class="col-2 closebtn">&times;</div>
    </div>
    `)
    $('#search').val("")
    btnClick();
    closeBtn();
})

//Button Click
function btnClick() {
    $('.searchvalue').on('click', function() {
        $('#gifCard').empty();
        let searchString = $(this).text();
        let rating = "g";
        giphy(searchString, rating)
    })
}
btnClick();

//Close Button
function closeBtn() {
    $('.closebtn').on('click', function() {
    $(this).parentsUntil($('#btn')).remove()
})
}
closeBtn()

})