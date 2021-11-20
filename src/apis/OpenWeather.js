const { default: got } = require('got');

module.exports = class OpenWeather {
  #endpoint = 'https://api.openweathermap.org/data/2.5/weather';
  #degreeType = { imperial: 'F', metric: 'C', standard: 'K' };

  constructor(options) {
    this.options = {};

    if (options) {
      this.options = options;

      if (!options.key || typeof options.key !== 'string')
        throw new Error('Please provide a valid API key');

      if (!options.city) throw new Error('Please provide the city name');

      if (!options.unit)
        throw new Error('Please provide an unit of measurement');

      if (!['imperial', 'metric', 'standard'].includes(options.unit))
        throw new Error(
          `Please provide a valid unit: imperial / metric / standard`
        );
    }
  }

  setApiKey(key) {
    if (!key || typeof key !== 'string')
      throw new Error('Please provide a valid API key');

    this.options.key = key;
    return this;
  }

  setCity(city) {
    if (!city) throw new Error('Please provide the city name');

    this.options.city = city;
    return this;
  }

  setLang(lang) {
    this.options.lang = lang;
    return this;
  }

  setUnit(unit) {
    if (!unit) throw new Error('Please provide an unit of measurement');

    if (!['imperial', 'metric', 'standard'].includes(unit))
      throw new Error(
        `Please provide a valid unit: imperial / metric / standard`
      );

    this.options.unit = unit;
    return this;
  }

  getData() {
    return got(this.#endpoint, {
      searchParams: {
        appid: this.options.key,
        units: this.options.unit || 'imperial',
        lang: this.options.lang || 'en',
        q: this.options.city
      }
    })
      .then(res => {
        const data = JSON.parse(res.body);

        return {
          location: {
            name: data.name,
            countryCode: data.sys.country,
            coord: data.coord
          },
          current: {
            clouds: data.clouds,
            degreeType: this.#degreeType[this.options.unit],
            feelsLike: data.main.feels_like,
            humidity: data.main.humidity,
            temperature: data.main.temp,
            temperatureMin: data.main.temp_min,
            temperatureMax: data.main.temp_max
          },
          weather: {
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
            description: data.weather[0].description,
            weatherCondition: data.weather[0].main
          }
        };
      })
      .catch(console.log);
  }
};
