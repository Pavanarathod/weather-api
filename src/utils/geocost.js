const request = require("request");
const foreCost = (address, callData) => {
  const url = `http://api.weatherstack.com/current?access_key=19b2b799ca4cbdc749a24e9c26fcdd68&query=${address}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callData("Unagle locate the location", undefined);
    } else {
      callData(undefined, {
        name: body.location.name,
        country: body.location.country,
        temp: body.current.temperature,
        weather: body.current.weather_descriptions,
      });
    }
  });
};

module.exports = foreCost;
