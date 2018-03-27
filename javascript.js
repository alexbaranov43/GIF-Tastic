var topics = ["8-bit", "nintendo", "sonic", "dogs", "trampolines", "cars", "bikes"];
$("#results").hide();
var favorites = [];

function displayGIF() {
    $("#favorites").hide();
    var topic = $(this).attr("data-name");
    $("#results").empty();

    var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=Zqmlr4sTEvvj2GmCoP9HWA9VlU2MhXIA&q=" + topic + "&limit=10"
    $.ajax({
        url: queryUrl,
        method: "GET",
    }).then(function (results) {
        //$("#results").empty();
        // console.log(results)
        var results = results.data
        for (i = 0; i < results.length; i++) {

            var fav = $("<button class='fav'>")
            var gifDiv = $("<div class='images'>")
            var gif = $("<img class='gifs'><br>")
            var rating = results[i].rating;


            var p = $("<p>").text("Rating: " + rating);
            gif.attr("src", results[i].images.fixed_height_still.url);
            gif.attr("data-still", results[i].images.fixed_height_still.url)
            gif.attr("data-animate", results[i].images.fixed_height.url);
            gif.attr("data-state", "still");
            fav.text("Add to Favorites");
            fav.attr("src", results[i].images.fixed_height.url)

            gifDiv.prepend(p);
            gifDiv.prepend(fav)
            gifDiv.prepend(gif)
            //gifDiv.prepend(gif);

            $("#results").prepend(gifDiv);
            $("#results").show();

        }
        $(".gifs").on("click", function () {

            var state = $(this).attr("data-state");
            // console.log(this)
            if (state === "still") {
                $(this).attr("data-state", "animate")
                $(this).attr("src", $(this).attr("data-animate"));
            } else if (state === "animate") {
                $(this).attr("data-state", "still")
                $(this).attr("src", $(this).attr("data-still"));
            }

        })

        $(".fav").click(function (event) {
            event.preventDefault();
            console.log(this)

            var favorite = $(this).attr("src")
            favorites.push(favorite);
            console.log(favorites)
            localStorage.setItem("favorites", JSON.stringify(favorites))
            //  console.log(favorite)
        })


    })
}


$(".favorites").on("click", function (event) {
    event.preventDefault();
    $("#favorites").show();
    $("#results").hide();
    $("#favorites").empty();

    var favorites = JSON.parse(localStorage.getItem("favorites"));
    for (i = 0; i < favorites.length; i++) {

        var favGif = $("<img>")

        favGif.attr("src", favorites[i]);
        console.log(favGif.attr("src"));
        $("#favorites").prepend(favGif);
    }


})





function renderButtons() {
    $("#boxes").empty();

    for (var i = 0; i < topics.length; i++) {
        var box = $("<button>");
        box.addClass("topic");
        box.attr("data-name", topics[i]);
        box.text(topics[i]);
        $("#boxes").append(box);
    }


}

$("#search").on("click", function (event) {
    event.preventDefault();

    var topic = $("#newGifs").val().trim();
    topics.push(topic);
    $("#newGifs").val("");

    renderButtons();



})

$(document).on("click", ".topic", displayGIF);
renderButtons();

$("#results").show();
$("#favorites").hide();


