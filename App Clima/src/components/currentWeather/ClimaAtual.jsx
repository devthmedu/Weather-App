import './ClimaAtual.css';
import { WiHumidity } from 'react-icons/wi';
import { FaWind } from 'react-icons/fa';
import { GiPressureCooker } from 'react-icons/gi';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';

const CurrentWeather = ({ data }) => {
  return (
    <div className="weather-container">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p className="weather-title">Clima Atual</p>
      </div>
      <div className="current-weather-container">
        <div className="current-weather-status">
          <div className="city">{data.city}</div>
          <div className="icon-temp-container">
            <img
              src={`icons/${data.weather[0].icon}.png`}
              alt="weather"
              className="weather-icon"
            />
            <p className="temperature">{Math.round(data.main.temp)}℃</p>
          </div>
          <div className="weather-description">
            {data.weather[0].description}
          </div>
        </div>

        <div className="current-weather-info">
          <div className="feels_like">
            Feels like
            <span className="parameter-value">
              {Math.round(data.main.feels_like)}℃
            </span>
          </div>

          <div className="high-low-container">
            <div className="weather-degree">
              <AiOutlineArrowUp />
              <p className="parameter-value">
                {Math.round(data.main.temp_max)}℃
              </p>
            </div>
            <div className="weather-degree">
              <AiOutlineArrowDown />
              <p className="parameter-value">
                {Math.round(data.main.temp_min)}℃
              </p>
            </div>
          </div>

          <div className="info-row">
            <div className="info-icon-container">
              <WiHumidity className="info-icon" />
              Humidity
            </div>
            <span className="parameter-value">{data.main.humidity}%</span>
          </div>
          <div className="info-row">
            <div className="info-icon-container">
              <FaWind className="info-icon" />
              Wind
            </div>
            <span className="parameter-value">{data.wind.speed} m/s</span>
          </div>
          <div className="info-row">
            <div className="info-icon-container">
              <GiPressureCooker className="info-icon" />
              Pressure
            </div>
            <span className="parameter-value">{data.main.pressure}hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CurrentWeather;