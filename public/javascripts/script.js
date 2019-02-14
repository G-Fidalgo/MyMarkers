const geolocationReady = new Promise(function(resolve, reject) {
  navigator.geolocation.getCurrentPosition(function(position) {
    resolve(
      (pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    );
  });
});

geolocationReady.then(currentPosition => {
  //todo: remember to add something like map.init(APIKEY, DOMEl) mario´s style
  mapboxgl.accessToken =
    "pk.eyJ1Ijoic2VuaW9yaXRveCIsImEiOiJjanJ5cmQxc3gweGx5M3ludjVwamMzam1wIn0.c91HFhhkAeZWsT4v1Pm8NQ";

  var map = new mapboxgl.Map({
    container: "map", // container id
    style: "mapbox://styles/mapbox/streets-v9", // stylesheet location
    center: [currentPosition.lng, currentPosition.lat], // starting position [lng, lat]
    zoom: 14, // starting zoom
    trackuserlocationstart: true
  });

  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    })
  );

  var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
  });

  document.getElementById("geocoder").appendChild(geocoder.onAdd(map));

  let clickedPos = new mapboxgl.Marker();

  map.on("click", function(e) {
    clickedPos.setLngLat(e.lngLat).addTo(map);
    document.querySelector("#lat").value = e.lngLat.lat;
    document.querySelector("#lng").value = e.lngLat.lng;
  });

  // document.getElementById('sandra').onsubmit=pru;

  // function pru(e){
  //   // e.preventDefault();
  //   console.log(e)
  // }
    // document.getElementById('addMarker').click((e)=>{
    //   e.preventDefault()
    //   console.log('envio')
    //   // axios.post(`${server}/home`)
    //   //   .then()
    // })
    
    
  

  if (window.location.href.includes("heroku")) {
    server = `https://mymarkers.herokuapp.com`;
  } else {
    server = `http://localhost:3000`;
  }

  var places = {
    type: "FeatureCollection",
    features: []
  };

  function showUserInfo() {
    axios.get(`${server}/home/getUserInfo`).then(user => {
      document.getElementById("userName").innerHTML = `${
        user.data.user.username
      }`;
      document.getElementById(
        "numberOfLocations"
      ).innerHTML = `You have saved ${user.data.user.markers.length} locations`;
    });
  }

  showUserInfo();

  function showMarkers() {
    axios.get(`${server}/home/getMarkets`).then(markers => {
      markers.data.markers.forEach(marker => {
        if (marker.lng === undefined || marker.lat === undefined) return;
        if (typeof marker.lng === "number" && typeof marker.lat === "number") {
          places.features.push(toGeoJSON(marker));
        }

       
      });
      map.on("load", function() {
        map.addLayer({
          id: "locations",
          type: "symbol",
          // Add a GeoJSON source containing place coordinates and information.
          source: {
            type: "geojson",
            data: places
          },
          type: "circle",
          paint: {
            "circle-radius": 10,
            "circle-color": "red"
          }
        });
      });
    });
  }

  function searchedUserMarkers(param) {
    places.features=[]
    map.removeLayer('locations')
    axios.get(`${server}/home/${param}`).then(markers => {
      markers.data.markers.forEach(marker => {
        if (marker.lng === undefined || marker.lat === undefined) return;
        if (typeof marker.lng === "number" && typeof marker.lat === "number") {
          places.features.push(toGeoJSON(marker));
        }


        
      });

 
        map.addLayer({
        id: `${param}`,
        type: "symbol",
        source: {
        type: "geojson",
        data: places,
        },
        type: "circle",
        paint: {
          "circle-radius": 10,
          "circle-color": "red"
        }
        });
      // map.on("load", function() {
      //   map.addLayer({
      //     id: "p",
      //     type: "symbol",
      //     // Add a GeoJSON source containing place coordinates and information.
      //     source: {
      //       type: "geojson",
      //       data: places
      //     },
      //     type: "circle",
      //     paint: {
      //       "circle-radius": 10,
      //       "circle-color": "red"
      //     }
      //   });
      // });
    });
  }

  document.getElementById('boton').onclick=function(e){
    searchedUserMarkers('5c6458cb65c37d00173396cf')

  }

  showMarkers();
});
