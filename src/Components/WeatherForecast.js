import React from "react";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import AirIcon from "@mui/icons-material/Air";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CompressIcon from "@mui/icons-material/Compress";

function WeatherForecast({
  formatDate,
  weather,
  main,
  list,
  city,
  hour,
  period,
}) {
  return (
    <div
      className="col-lg-9 col-md-8 weather-forecast"
      style={{
        backgroundImage:
          "url(https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRBW4JSEo8iBpQAgHqpB9kkt7FdA3CdWWtUmkpEXSOSZ-Dmkqpk)",
      }}
    >
      <div className="content">
        <div className="date">
          <h1>{formatDate(1)}</h1>
          <h2>{formatDate(2)}</h2>
        </div>

        <div className="forecast">
          {list ? (
            <>
              {list.map((value, index) => {
                if (index >= 10) {
                  return;
                }
                if (index < 2) return;

                return (
                  <div className="forecast-item" key={index}>
                    <h3 className="time">{value.dt_txt.slice(10, 16)}</h3>
                    <img
                      src={`https://openweathermap.org/img/wn/${list[index].weather[0].icon}@2x.png`}
                      alt="icon"
                      width={50}
                    />
                    <p>{Math.round(value.main.temp)}°C</p>
                  </div>
                );
              })}
            </>
          ) : null}
        </div>

        {main && city ? (
          <div className="highlights">
            <h4 className="py-2">Today's Highlights</h4>
            <div className="row gap-lg-4 gap-md-3 gap-sm-3 d-flex justify-content-center">
              <div className="col-lg-3 col-md-3 highlight-item">
                <h3>Feels like</h3>
                <h2>
                  <ThermostatIcon fontSize="large" />
                  {Math.round(main.feels_like)}°C
                </h2>
              </div>

              <div className="col-lg-4 col-md-3 highlight-item">
                <h3>Wind status</h3>
                <h2>
                  <AirIcon fontSize="large" /> {weather.wind.speed} Km/h
                </h2>
              </div>

              <div className="col-lg-4 col-md-4 highlight-item">
                <h3>Sunrise & Sunset</h3>
                <p>
                  <WbTwilightIcon color="warning" /> {`06:35 AM`}
                </p>
                <p>
                  <NightsStayIcon color="warning" /> {`07:02 PM`}
                </p>
              </div>

              <div className="col-lg-3 col-md-3 highlight-item">
                <h3>Humidity</h3>
                <h2>
                  <WaterDropIcon /> {main.humidity}%
                </h2>
              </div>

              <div className="col-lg-4 col-md-3 highlight-item">
                <h3>Visibility</h3>
                <h2>
                  <VisibilityIcon /> {weather.visibility / 1000} km
                </h2>
              </div>

              <div className="col-lg-4 col-md-4 highlight-item">
                <h3>Pressure</h3>
                <h2>
                  <CompressIcon /> {main.pressure} hPa
                </h2>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default WeatherForecast;
