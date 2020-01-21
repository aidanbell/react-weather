export function getCurWeather(lat, lng, units) {
  const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=${units}&appid=a1c7cdd90159b4459ed96cc67ae2b3ca`;
  return fetch(endpoint, {
    mode: 'cors'
  }).then(res => res.json());
}

export function getForecast(lat, lng, units) {
  const endpoint = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=${units}&appid=a1c7cdd90159b4459ed96cc67ae2b3ca`;
  return fetch(endpoint, {
    mode: 'cors'
  }).then(res => res.json());
}