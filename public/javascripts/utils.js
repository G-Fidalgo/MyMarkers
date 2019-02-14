function toGeoJSON(marker) {
  return {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [marker.lng, marker.lat]
    },
    properties: {
      name: `${marker.name}`,
      description: `${marker.description}`
    }
  }
}

function randomIntFromInterval(min,max) // min and max included
{
    return Math.floor(Math.random()*(max-min+1)+min);
}