var gifApp = {

    buttonArr: ["Lions", "Tigers", "Bears"],

    makeButtons: function () {

        console.log(gifApp.buttonArr.length);

        for (i = 0; i < gifApp.buttonArr.length; i++) {

            var tempButton = $("<button class='animal-button'>" + gifApp.buttonArr[i] + "</button>");
            $("#buttons").append(tempButton);


        }
    },

    getGifs: function (event) {

        console.log("getGifs started");

        $("#gifs").empty();
        var animal = event.target.textContent;
        console.log(animal);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            animal + "&api_key=NiiewOWNXvpGKO1gZpXJ8Z5PfVXH6jUs&limit=10";

        console.log(queryURL);


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            console.log(response);

            var results = response.data;

            for (i = 0; i < results.length; i++) {

                var animalDiv = $("<div>");
                var p = $("<p>");
                p.text(results[i].rating);
                var animalImage = $("<img class='gif'>");
                animalImage.attr("src", results[i].images.fixed_height_still.url);
                animalImage.attr("data-animated", results[i].images.fixed_height.url);
                animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                animalImage.attr("data-state", "still");
                animalDiv.append(p);
                animalDiv.append(animalImage);
                $("#gifs").prepend(animalDiv);

            }

        });
    },

    animate: function (event) {

        var state = event.target.dataset.state;

        if (state === "still") {

            event.target.src = event.target.dataset.animated;
            event.target.dataset.state = "animated";

        }
        else {

            event.target.src = event.target.dataset.still;
            event.target.dataset.state = "still";

        }


    }
}

$(document).ready(function () {

    console.log("hello");


    gifApp.makeButtons();

    $(document).on("click", ".animal-button", this, gifApp.getGifs);
    $(document).on("click", ".gif", this, gifApp.animate);

})