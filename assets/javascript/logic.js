//  Array of cartoons
var cartoons = ["Arthur", "Dinosaur World", "Beauty and the beast", "Batman", "Hotel Transylvania", "The Lion King",
    "Curious George", "Scooby Doo", "Snow White", "The Simpsons", "Mickey Mouse", "Minions", "Frozen",
    "Spongebob", "Ninja Turtles", "Disney", "Donald Duck", "Tinkerbell", "Pokemon", "Archie comics"
];
console.log(cartoons);

// Function for displaying gif buttons
function displayCartoonButton() {
    $("#buttons-View").empty();
    // Looping through the array of cartoons
    for (var i = 0; i < cartoons.length; i++) {

        //Dynamically generating buttons for each cartoons in the array
        var gifButton = $("<button>");
        // Adding a class of cartoons to our button
        gifButton.addClass("cartoon");
        gifButton.addClass("btn btn-primary")
        // Adding a data-attribute
        gifButton.attr("data-name", cartoons[i]);
        // Providing the initial button text
        gifButton.text(cartoons[i]);
        // Adding the button to the buttons-View div
        $("#buttons-View").append(gifButton);
        // console.log(gifButton);
    }
}

//function to add new button

function addNewButton() {
    $("#addGif").on("click", function () {
        var newCartoon = $("#newInput").val().trim();
        if (newCartoon == "") {
            return false; //no blank buttons
        }
        cartoons.push(newCartoon);

        displayCartoonButton();
        return false;
    });
}

// function that displays the gifs
function displayCartoonGifs() {
    $(".gifsView").empty();

    var cartoon = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + cartoon + "&api_key=3GECPB0qGCDBoquA6dm3LSSFpVpmwHgM&limit=10";


    $.ajax({
            url: queryURL,
            method: "GET"
        })

        .done(function (response) {
            console.log(response);
            displayCartoonButton();

            //show results of gifs from Json
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                //put gifs in a div
                var gifDiv = $("<div1>");
                //get rating of gif
                var gifRating = $("<p>").text("Rating : " + results[i].rating);
                gifDiv.append(gifRating);

                //pull gif
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                //paused images
                gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                //animated images
                gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
                //how images come in, already paused
                gifImage.attr("data-state", "still");
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                //add new div to existing divs
                $(".gifsView").prepend(gifDiv);
            }
        });
}

// Calling functions
displayCartoonButton();
addNewButton();


//event listeners
$(document).on("click", ".cartoon", displayCartoonGifs);
$(document).on("click", ".image", function () {

    var state = $(this).attr('data-state');
    if (state == 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }

});