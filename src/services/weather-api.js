export function getCurWeather(lat, lng, units) {
  const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=${units}&appid=f610830a383051d4b21cd59f0ad5f08a`;
  return fetch(endpoint, {
    mode: 'cors'
  }).then(res => res.json());
}

export function getForecast(lat, lng, units) {
  const endpoint = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=${units}&appid=f610830a383051d4b21cd59f0ad5f08a`;
  return fetch(endpoint, {
    mode: 'cors'
  }).then(res => res.json());
}