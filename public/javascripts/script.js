var promise = new Promise(function(resolve, reject) {
  navigator.geolocation.getCurrentPosition(function(position) {
    resolve(
      (pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    );
  });
});

promise.then(currentPosition => {
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
});


