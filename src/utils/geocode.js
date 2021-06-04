const request = require("request");
const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicGF2YW4tcGF0dGluc29uIiwiYSI6ImNrcGRtdHlseDFwMTQybm54OWNlaWo2ZHUifQ.J3XmnDr9AqXgUTAv8hf5EQ&limit=1`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable locate the address..", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to locate the address", undefined);
    } else {
      callback(undefined, {
        lat: response.body.features[0].center[0],
        lang: response.body.features[0].center[1],
        place_name: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
