
// Business Logic for LogBook ---------
function LogBook() {
  this.places = {};
  this.placeId = 0;
}

LogBook.prototype.addPlace = function(place) {
  place.id = this.assignId();
  this.places[place.id] = place;
};

LogBook.prototype.assignId = function () {
  this.placeId += 1;
  return this.placeId;
}

LogBook.prototype.findPlace = function (id) {
  // this.places[id] += 1;
  // return this.places[id];
  if (this.places[id] != undefined) {
    return this.places[id];
  }
  return false;
}

LogBook.prototype.deletePlace = function (id) {
  if (this.places[id] === undefined) {
    return false;
  }
  delete this.places[id];
  return true;
};

// Business Logic for Places---------
function Place(country, city, landmark, rating) {
  this.country = country;
  this.city = city;
  this.landmark = landmark;
  this.rating = rating;
}

Place.prototype.fullName = function() {
  return this.country + " " + this.city;
};


// let place = new Place ("");

// for (const key in place) {
//   if (place.hasOwnProperty(key)) {
//     console.log(place[key]);
//   }
// }

// let logBook = new LogBook();
// let place = new Place("Washington", "Seattle", "Space Needle", "2");
// let place2 = new Place("Oregon", "Tigard", "McDonalds", "3");
// logBook.addPlace(place);
// logBook.addPlace(place2);
// logBook.deletePlace(1);
// logBook.places;

// User Interface Logic ---------

function attachPlaceListeners() {
  $("ul#places").on("click", "li", function() {
    showPlace(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    logBook.deletePlace(this.id);
    $("#show-place").hide();
    displayPlaceDetails(logBook);
  });
}
function showPlace(placeId) {
  const place = logBook.findPlace(placeId);
  $("#show-place").show();
  $(".country-name").html(place.country);
  $(".city-name").html(place.city);
  $(".landmark").html(place.landmark);
  $(".rating").html(place.rating);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + place.id + ">Delete</button>");
}

let logBook = new LogBook();

function displayPlaceDetails(logBookToDisplay) {
  let placesList = $("ul#places");
  let htmlForPlaceInfo = "";
  Object.keys(logBookToDisplay.places).forEach(function(key) {
    const place = logBookToDisplay.findPlace(key);
    htmlForPlaceInfo += "<li id=" + place.id + ">" + place.city + ", " + place.country + "</li>";
  });
  placesList.html(htmlForPlaceInfo);
}

$(document).ready(function () {
  attachPlaceListeners();
  $("form#new-place").submit(function (event) {
    event.preventDefault();
    const inputtedCountry = $("input#new-country").val();
    const inputtedCity = $("input#new-city").val();
    const inputtedLandmark = $("input#new-landmark").val();
    const inputtedRating = $("input#new-rating").val();
    $("input#new-country").val("")
    $("input#new-city").val("");
    $("input#new-landmark").val("");
    $("input#new-rating").val("");
    let newPlace = new Place(inputtedCountry, inputtedCity, inputtedLandmark, inputtedRating);
    logBook.addPlace(newPlace);
    displayPlaceDetails(logBook);
  });
});