let geocoder;
let map;
let lat;
let lng;
let mapResult;
let placeName;
let addressList = document.getElementById('suggestion-list')
let nameInput = document.getElementById('place-name')
let latInput = document.getElementById('lat');
let lngInput = document.getElementById('lng');
let placeQuestion = document.getElementById('place-question');
let saveBtn = document.getElementById('submit-add-place');
let searchPlaceBtn = document.getElementById('search-address-btn');
let searchInput = document.getElementById('search-address');
let imageurl = "https://cdn1.iconfinder.com/data/icons/maps-and-navigation-11/24/camera-style-map-navigation-three-photography-gps-maps-pin-photo-512.png";

  window.onload = () => {
    geocoder = new google.maps.Geocoder()
  };



  let image = {
    url: imageurl,
    size: new google.maps.Size(71, 71),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(17, 34),
    scaledSize: new google.maps.Size(25, 25)
  };

  function initialize() {
    // nameInput.style.visibility = "hidden"
    // latInput.style.visibility = "hidden"
    // lngInput.style.visibility = "hidden"
    // geocoder = new google.maps.Geocoder();
    let latlng = new google.maps.LatLng(-17, -5.6601331);
    let mapOptions = {
      zoom: 2,
      center: latlng
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }   
  
  function codePlace() {
    placeQuestion.style.visibility = "visible";
    // gecocoder = new google.maps.Geocoder();
    let place = document.getElementById('search-place').value;
    geocoder.geocode( { 'address': place}, function(results, status) {
      mapResult = results
      if (status == 'OK') {
        if (addressList !== null) {
          addressList.innerHTML = `<span onclick="setPlaceInfo()" id="suggestion-link-text">${results[0].formatted_address}</span>`;
        } 
        // map.setCenter(results[0].geometry.location);
        lat = results[0].geometry.location.lat();
        lng = results[0].geometry.location.lng();
        placeName = mapResult[0].address_components[0].long_name
        // let marker = new google.maps.Marker({
        //     map: map,
        //     icon: image,
        //     shape: shape,
        //     position: results[0].geometry.location

        // });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
  

  function setPlaceInfo() {
    saveBtn.style.visibility = 'visible';
    nameInput.innerHTML = `<h1>${placeName}</h1>`;
    nameInput.value = placeName;
    latInput.value = lat;
    lngInput.value = lng;
  }


  function getPlaces() {
    axios.get("/api/places")
     .then(response => {
       markPlaces(response.data);
     })
     .catch(error => {
       console.log(error);
     })
   }

   function markPlaces(places){
    places.forEach((place) => {
      console.log(place)
      const center = {
        lat: place.location.coordinates[1],
        lng: place.location.coordinates[0]
      };
      const pin = new google.maps.Marker({
        position: center,
        map: map,
        icon: image,
        title: place.name
      });
    
      // markers.push(pin);
    });
    
  }
  
  
  getPlaces();
  initialize();
  