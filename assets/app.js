//GiphyAPI Query
function giphy (searchString, page) {
let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=J9SB4HAWrd8Xn8ZgDkn5edId8003c6OW&q=" + searchString + "&offset=" + page  + "&lang=en";
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
      let a = response.data
    for (let i = 0; i < 10; i++) {
        title = a[i].title.split(" GIF")
        $('#gifCard').append(`
        <div id="gif" class="card col-sm-6 col-md-4 col-lg-3 mt-2">
            <img class="giphy card-img-top" data-image="${a[i].images.original_still.url}" data-gif="${a[i].images.original.url}" src="${a[i].images.original_still.url}" alt="Card image cap">
            <div class="row card-body">
                <div class="tags col-sm-10">
                <p class="card-text title">Title: ${title[0].charAt(0).toUpperCase() + title[0].slice(1)}</p>
                <p class="card-text rating">Rating: ${a[i].rating.toUpperCase()}</p>
                </div>
                <div class="col-sm-1 addFav">
                <button type="button" data-toggle="tooltip" title="Add to favorite" class="btn btn-secondary btn-sm">+</button>
                </div>
            </div>
        </div>
        `)
    }
    $('[data-toggle="tooltip"]').tooltip()
  });
}

let page = 0;
let searchString;
let favArr = [];

//Document Ready
$(function() {
    $('#viewMore').hide()
//Search and add function
$('#searchAdd').on('click', function() {
    event.preventDefault();
    let searchVal = $.trim($('#search').val())
    if (searchVal !== "") {
        $('#btn').append(`
        <div class="gif col-sm-2 btn btn-secondary mr-1 mt-1">
        <div class="row align-items-center">
        <div class="searchvalue col-8">${searchVal}</div>
        <div class="col-2 closebtn">&times;</div>
        </div>`)
        $('#search').val("")
        btnClick();
        closeBtn();
    }
})

//Button Click
function btnClick() {
    $('.searchvalue').on('click', function() {
        $('#viewMore').show()
        $('#gifCard').empty();
        searchString = $(this).text();
        page = 0;
        giphy(searchString, page)
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

$(document).on('click', '#viewMore', function() {
    page += 10;
    giphy(searchString, page)
})

$(document).on('click', '.addFav', function() {
    let favObj = {
        imageLink: $(this).parent().siblings().attr('data-image'),
        gifLink: $(this).parent().siblings().attr('data-gif'),
        title: $(this).parent().children('.tags').children('.title').text(),
        rating: $(this).parent().children('.tags').children('.rating').text()
    }
    if (favArr.map(function(gif) {
        return gif.imageLink
    }).indexOf(favObj.imageLink) == -1) {
        favArr.push(favObj)
    }
})

$(document).on('click', '.giphy', function() {
    let _gif = $(this).attr("data-gif")
    let _still = $(this).attr("data-image")
    if ($(this).attr("src") == _still ) {
        $(this).attr("src", _gif)
    } else if ($(this).attr("src") == _gif) {
        $(this).attr("src", _still)
    }
})

$(document).on('click', '#fav', function() {
    $('#gifCard').empty();
    favArr.forEach(gif => { 
        $('#gifCard').append(`
        <div id="gif" class="card col-sm-6 col-md-4 col-lg-3 mt-2">
            <img class="giphy card-img-top" data-image="${gif.imageLink}" data-gif="${gif.gifLink}" src="${gif.imageLink}" alt="Card image cap">
            <div class="row card-body">
                <div class="tags col-sm-10">
                <p class="card-text title">${gif.title}</p>
                <p class="card-text rating">${gif.rating}</p>
                </div>
            </div>
        </div>
        `
        )
    });
    $('#viewMore').hide()
})