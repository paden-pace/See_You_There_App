
    console.log('api.js is loading');


     var date = new Date();
     var forecastDate = date.getMonth() + 1 + "/" + date.getDate();
     $("#today").append(forecastDate);
     date.setDate(date.getDate() + 1)
     forecastDate = date.getMonth() + 1 + "/" + date.getDate();
     $("#after1Day").append(forecastDate);
     date.setDate(date.getDate() + 1)
     forecastDate = date.getMonth() + 1 + "/" + date.getDate();
    $("#after2Day").append(forecastDate);
    date.setDate(date.getDate() + 1)
     forecastDate = date.getMonth() + 1 + "/" + date.getDate();
    $("#after3Day").append(forecastDate);
    date.setDate(date.getDate() + 1)
     forecastDate = date.getMonth() + 1 + "/" + date.getDate();
    $("#after4Day").append(forecastDate);
    date.setDate(date.getDate() + 1)
     forecastDate = date.getMonth() + 1 + "/" + date.getDate();
    $("#after5Day").append(forecastDate);
    date.setDate(date.getDate() + 1)
     forecastDate = date.getMonth() + 1 + "/" + date.getDate();
    $("#after6Day").append(forecastDate);
    date.setDate(date.getDate() + 1)
     forecastDate = date.getMonth() + 1 + "/" + date.getDate();
    $("#after7Day").append(forecastDate);
    date.setDate(date.getDate() + 1)
     forecastDate = date.getMonth() + 1 + "/" + date.getDate();
    $("#after8Day").append(forecastDate);
    date.setDate(date.getDate() + 1)
     forecastDate = date.getMonth() + 1 + "/" + date.getDate();
    $("#after9Day").append(forecastDate);
    date.setDate(date.getDate() + 1)
     forecastDate = date.getMonth() + 1 + "/" + date.getDate();
    $("#after10Day").append(forecastDate);
    date.setDate(date.getDate() + 1)
     forecastDate = date.getMonth() + 1 + "/" + date.getDate();
    $("#after11Day").append(forecastDate);
    date.setDate(date.getDate() + 1)
     forecastDate = date.getMonth() + 1 + "/" + date.getDate();
    $("#after12Day").append(forecastDate);
    date.setDate(date.getDate() + 1)
     forecastDate = date.getMonth() + 1 + "/" + date.getDate();
    $("#after13Day").append(forecastDate);
    date.setDate(date.getDate() + 1)
     forecastDate = date.getMonth() + 1 + "/" + date.getDate();
    $("#after14Day").append(forecastDate);
    date.setDate(date.getDate() + 1)
     forecastDate = date.getMonth() + 1 + "/" + date.getDate();
    $("#after15Day").append(forecastDate);
    date.setDate(date.getDate() + 1)
     forecastDate = date.getMonth() + 1 + "/" + date.getDate();
    $("#after16Day").append(forecastDate);

     

    var map = null;
    var service = null;
    var service2 = null;
    var weatherLayer = null;
    var cloudLayer = null;
    var transitLayer = null;
    var resultsCopy = null;
    var statusCopy = null;
    var markers = [];
    function initMap() {
         map = new google.maps.Map(document.getElementById('map'), {
          zoom: 18,
          center: {lat: 30.28663, lng: -97.74116 }
        });

       transitLayer = new google.maps.TransitLayer();
        transitLayer.setMap(map);

       weatherLayer = new google.maps.weather.WeatherLayer({
          temperatureUnits: google.maps.weather.TemperatureUnit.FAHRENHEIT
        });

      weatherLayer.setMap(map);

      cloudLayer = new google.maps.weather.CloudLayer();

      cloudLayer.setMap(map);

      service = new google.maps.places.PlacesService(map);

          map.addListener('click', function(e) {
          clearMarkers();
          $("#placeInformation").find("tr:gt(0)").remove();
          $("#weatherForecast").find("tr:gt(0)").remove();
          var resetLocOption = "<option>No Location</option>";
          $("#event-loc-select").html(resetLocOption);
          placeMarkerAndPanTo(e.latLng, map);
          getWeather(e.latLng.lat(), e.latLng.lng());
          var interest = $("#interest").find(":selected").text();
          var radius = Number($("#searchRadius").val().trim());
          console.log(radius);
          switch(interest)
          {
            case "Amusement Park":
              interest = "amusement_park";
              break;
            case "Art Gallery":
              interest = "art_gallery";
              break;
            case "Book Store":
              interest = "book_store";
              break;
            case "Bowling Alley":
              interest = "bowling_alley";
              break;
            case "Bowling Alley":
              interest = "bowling_alley";
              break;
            case "Movie Theater":
              interest = "movie_theater"
              break;
            case "Night Club":
              interest = "night_club";
              break;

          }

          service.textSearch({
            location: e.latLng,
            radius: radius,
            query: interest
          }, callback);
        });

        
      }

      function placeMarkerAndPanTo(latLng, map) {
        var marker = new google.maps.Marker({
          position: latLng,
          map: map
        });
        map.panTo(latLng);
        markers.push(marker);
      }

      function callback(results, status) {
        
        if (status === google.maps.places.PlacesServiceStatus.OK) 
        {
          console.log(results);
          resultsCopy = results;
          statusCopy = status;
          service2 = new google.maps.places.PlacesService(map);
          for (var i = 0; i < results.length; i++) 
          {  
            if(i <= 4)
            {
              console.log(i);
              createMarker(results[i]);
              service2.getDetails({
              placeId: results[i].place_id
              }, callback2);
            }
            else
            {
              // setTimeout(queryForRemainingTen, 10000);
              break;
            }
          }
            /*var placeResults = "<tr><td>" + results[i].name + "</td>" +
                        "<td>" + results[i].price_level + "</td>" +
                        "<td>" + results[i].rating + "</td>" +
                        "<td>" + results[i].vicinity + "</td></tr>" +
            $("#placeInformation").append(placeResults);*/ 
        }
      }

      // function queryForRemainingTen()
      // {
      //   if (statusCopy === google.maps.places.PlacesServiceStatus.OK) 
      //   {
      //     console.log(resultsCopy);
      //     service2 = new google.maps.places.PlacesService(map);
          
      //     for (var i = 10; i < resultsCopy.length; i++) 
      //     {  
      //         console.log(i);
      //         createMarker(resultsCopy[i]);
      //         service2.getDetails({
      //         placeId: resultsCopy[i].place_id
      //         }, callback2);
      //     }
      //   }
      // }

      function callback2(results, status) {
        console.log(status);
        if (status === google.maps.places.PlacesServiceStatus.OK) 
        {
          console.log(results);
          var priceRating;
          switch(results.price_level)
          {
            case 0:
                priceRating = "$";
            break;
            case 1:
                priceRating = "$";
            break;
            case 2:
                priceRating = "$$";
            break;
            case 3:
                priceRating = "$$$";
            break;
            case 4:
                priceRating = "$$$";
            break;
            default:
                priceRating = "Unknown";
            break;
          }
          var placeResults = "<tr><td>" + results.name + "</td>" +
                      "<td>" + priceRating + "</td>" + 
                      "<td>" + results.rating + " /5</td>" + 
                      "<td><a href='" + results.url + "'>Google Info</a></td>" +
                      "<td><a href='" + results.website + "'>Website</a></td></tr>";      

          $("#placeInformation").append(placeResults); 
        }



            var newLocOption = "<option>" + results.name + "</option>";

            $("#event-loc-select").append(newLocOption);

      }
      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        markers.push(marker);

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }

      function clearMarkers()
      {
        console.log("markers: " + markers.length);
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);

        }
        markers = [];
      }
      // function to get weather for an address
    function getWeather(latitude,longitude) {
      if(latitude != '' && longitude != '') {
        //$("#weather").val("Retrieving weather...");                   // write temporary response while we get the weather
        $.getJSON( "http://api.openweathermap.org/data/2.5/forecast/daily?lat="+latitude+"&lon="+longitude+"&cnt=16&units=imperial&APPID=ba0f308ed591224086f33b427b689c9b", function(data) { // add '&units=imperial' to get U.S. measurements
          console.log(data);
          
          var weatherResults = "<tr><td><b>Temp:</b></td>";
          for(var day = 0; day < data.list.length; day++)
          {
            weatherResults += "<td>" + Math.round(data.list[day].temp.day) + " F</td>"
          }
          weatherResults += "</tr>";
          $("#weatherForecast").append(weatherResults); 
          weatherResults = "<tr><td><b>Humidity:</b></td>";
          for(var day = 0; day < data.list.length; day++)
          {
            weatherResults += "<td>" +  data.list[day].humidity + " %</td>"
          }
          weatherResults += "</tr>";
          $("#weatherForecast").append(weatherResults); 
          weatherResults = "<tr><td><b>Wind Speed:</b></td>";
          for(var day = 0; day < data.list.length; day++)
          {
            weatherResults += "<td>" + Math.round(data.list[day].speed) + " mph</td>"
          }
          weatherResults += "</tr>";
          $("#weatherForecast").append(weatherResults); 
          weatherResults = "<tr><td><b>Clouds:</b></td>";
          for(var day = 0; day < data.list.length; day++)
          {
            weatherResults += "<td>" + data.list[day].clouds + " %</td>"
          }
          weatherResults += "</tr>";
          $("#weatherForecast").append(weatherResults); 
          console.log(data);                        // log weather data for reference (json format) 
         // $("#weather").append(response);                  // write current weather to textarea
        });
      } else {
        return false;                           // respond w/error if no address entered
      }
    }
