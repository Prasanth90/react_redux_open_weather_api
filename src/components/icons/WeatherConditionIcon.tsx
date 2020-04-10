import React from 'react'
import { SizeProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCloudShowersHeavy,
  faCloud,
  faSnowflake,
  faCloudRain,
  faCloudSun,
  faBolt,
} from '@fortawesome/free-solid-svg-icons'

export interface IWeatherConditionIconProps {
  weatherCondition: string
  size?: SizeProp
}

const defaultProps: Partial<IWeatherConditionIconProps> = {
  size: '3x',
}

export const WeatherConditonIcon: React.FC<IWeatherConditionIconProps> = (
  props: IWeatherConditionIconProps
) => {
  switch (props.weatherCondition) {
    case 'Rain':
      return <FontAwesomeIcon icon={faCloudShowersHeavy} size={props.size} />
    case 'Snow':
      return <FontAwesomeIcon icon={faSnowflake} size={props.size} />
    case 'Thunderstorm':
      return <FontAwesomeIcon icon={faBolt} size={props.size} />
    case 'Clouds':
      return <FontAwesomeIcon icon={faCloud} size={props.size} />
    case 'Drizzle':
      return <FontAwesomeIcon icon={faCloudRain} size={props.size} />
    case 'Clear':
      return <FontAwesomeIcon icon={faCloudSun} size={props.size} />
    default:
      return <FontAwesomeIcon icon={faCloudSun} size={props.size} />
  }
}

WeatherConditonIcon.defaultProps = defaultProps
