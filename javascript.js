var topics = ["cats", "dogs", "trampolines", "cars", "bikes"];

function displayGIF() {
    var topic = $(this).attr("data-name");
    var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=Zqmlr4sTEvvj2GmCoP9HWA9VlU2MhXIA&q=" + topic + "&limit=10"
    $.ajax({
        url: queryUrl,
        method: "GET",
    }).then(function (results) {
        console.log(results)
        var results = results.data
        for (i = 0; i < results.length; i++) {
            var fav = $("<button class='fav'>")
            var gifDiv = $("<div class='images'>")
            var gif = $("<img class='gifs'><br>")
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var favorites = [];
            var favorite = $(".gifs").attr("src")
            gif.attr("src", results[i].images.fixed_height_still.url);
            gif.attr("data-still", results[i].images.fixed_height_still.url)
            gif.attr("data-animate", results[i].images.fixed_height.url);
            gif.attr("data-state", "still");
            fav.text("Add to Favorites");
            gifDiv.prepend(fav)
            gifDiv.prepend(gif);
            gifDiv.prepend(p);

            $("#results").prepend(gifDiv);

        }
        $(".gifs").on("click", function () {

            var state = $(this).attr("data-state");
            console.log(this)
            if (state === "still") {
                $(this).attr("data-state", "animate")
                $(this).attr("src", $(this).attr("data-animate"));
            } else if (state === "animate") {
                $(this).attr("data-state", "still")
                $(this).attr("src", $(this).attr("data-still"));
            }

        })


        $(".fav").on("click", function () {
            event.preventDefault();
            favorites.push(favorite);
            console.log(favorite)
            console.log(favorites)
            $(".favorites").on("click", function () {



            })

        })



    })
}


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


