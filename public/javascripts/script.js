document.addEventListener(
  "DOMContentLoaded",
  () => {

    console.log("IronGenerator JS imported successfully!");

    mapboxgl.accessToken =
    "pk.eyJ1Ijoic2VuaW9yaXRveCIsImEiOiJjanJ5cmQxc3gweGx5M3ludjVwamMzam1wIn0.c91HFhhkAeZWsT4v1Pm8NQ";
    
    let currentPosition = []

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{

        var map = new mapboxgl.Map({
          container: "map", // container id
          style: "mapbox://styles/mapbox/streets-v9", // stylesheet location
          center: [position.coords.longitude, position.coords.latitude], // starting position [lng, lat]
          zoom: 12, // starting zoom
          trackuserlocationstart: true
        });
    
        map.addControl(new mapboxgl.GeolocateControl({
          positionOptions: {
          enableHighAccuracy: true
          },
          trackUserLocation: true, showUserLocation: true
          }));
  
        currentPosition.push(position.coords.longitude, position.coords.latitude)

        var geocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken
          });

        document.getElementById('geocoder').appendChild(geocoder.onAdd(map))
        
        map.on('click', function (e) {
          document.getElementById('info').innerHTML =
          // e.point is the x, y coordinates of the mousemove event relative
          // to the top-left corner of the map
          JSON.stringify(e.point) + '<br />' +
          // e.lngLat is the longitude, latitude geographical position of the event
          JSON.stringify(e.lngLat);
          });

      })
      
    } else {
      console.log('error at getting your position')
    }

  },
  false
);
