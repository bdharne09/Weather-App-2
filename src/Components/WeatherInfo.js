import React from "react";
import Search from "./Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const WeatherInfo = ({
  search,
  inputEvent,
  weather,
  main,
  city,
  hour,
  period,
}) => {
  return (
    <div
      className="col-lg-3 col-md-4 weather-info "
      style={{
        backgroundImage: `${
          hour > 5 && period === "PM"
            ? "url(https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQH1pq86AP-xkuxin0Qwr4Tf3jgCjUIVhku_jFZQkL9TuBuT5ii)"
            : "url(https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSdhGecRWaiTyUEna2fjv8CwXfhxNDc0lu5U0eTdyHZ-PqWkBhW)"
        }`,
      }}
    >
      <div className="content">
        <Search search={search} inputEvent={inputEvent} />
        {main && city ? (
          <>
            <h1 className="city">
              <LocationOnIcon />
              {weather.name}
            </h1>

            <div className="img">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                width={200}
                alt="Weather"
              />
            </div>

            <div>
              <h2 className="temp">{Math.round(main.temp)}°C</h2>
            </div>

            <h2>{capitalize(weather.weather[0].description)}</h2>

            <div className="d-flex justify-content-center align-items-center gap-5 my-4">
              <div className="humidity">
                <h5>
                  <WaterDropIcon fontSize="medium" /> {main.humidity}%
                </h5>
                <p>Humidity</p>
              </div>

              <div className="wind">
                <h5>
                  <AirIcon fontSize="medium" /> {weather.wind.speed} m/h
                </h5>
                <p className="min-temp">Wind Speed</p>
              </div>
            </div>
          </>
        ) : (
          <div className="dataNotAvailable">
            <h2>No data found</h2>
            <p> Search proper city name</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherInfo;
