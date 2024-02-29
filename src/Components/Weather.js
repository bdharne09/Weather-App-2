import React, { useEffect, useState } from "react";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";

const key = "9e7975b6addbfccd3caf8fd278ecc0c4";

function Weather() {
  const [search, setSearch] = useState("");
  const [hour, setHour] = useState(null); //passing hours
  const [period, setPeriod] = useState(null); //am or pm passing
  const [weather, setWeather] = useState(null); //passing full result object of weather
  const [list, setList] = useState(null); // passing list of forecast
  const [main, setMain] = useState(null); //passing main prop. of weather url
  const [city, setCity] = useState(null); // passing city of forecast

  function inputEvent(event) {
    setSearch(event.target.value);
  }

  useEffect(
    function () {
      const getData = async () => {
        try {
          const weatherFetch = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=Metric&appid=${key}`
          );

          const forecastFetch = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${search}&units=Metric&appid=${key}`
          );

          const weatherResponse = await weatherFetch.json();
          const forecastResponse = await forecastFetch.json();

          setWeather(weatherResponse);
          setMain(weatherResponse.main);
          setList(forecastResponse.list);
          setCity(forecastResponse.city);
        } catch (err) {
          console.log(err);
        }
      };
      getData();
    },
    [search]
  );

  function formatDate(arg) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thrusday",
      "Friday",
      "Saturday",
    ];

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const date = new Date();
    let hrs = date.getHours();
    let min = date.getMinutes();
    min = min < 10 ? "0" + min : min;

    let period = hrs > 12 ? "PM" : "AM";

    hrs = hrs ? hrs : "12";
    hrs = hrs > 12 ? (hrs = hrs - 12) : hrs;
    hrs = hrs < 10 ? "0" + hrs : hrs;

    let d1 = date.getDate();

    d1 = d1 < 10 ? "0" + d1 : d1;

    let day = days[date.getDay()];
    let month = months[date.getMonth()];
    let year = date.getFullYear();

    setHour(hrs);
    setPeriod(period);

    if (arg === 1) {
      return `${hrs}:${min} ${period}`;
    }

    if (arg === 2) {
      return `${day}, ${d1} ${month} ${year}`;
    }
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="row weather">
              <WeatherInfo
                search={search}
                inputEvent={inputEvent}
                weather={weather}
                main={main}
                city={city}
                hour={hour}
                period={period}
              />
              <WeatherForecast
                formatDate={formatDate}
                weather={weather}
                main={main}
                list={list}
                city={city}
                hour={hour}
                period={period}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Weather;
