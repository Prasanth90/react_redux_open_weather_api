import React from 'react'
import DateTimeUtils from '../../../utils/DateTimeUtils'
import { IWeatherInfo, IWeatherForecastInfo } from '../../../store/weather/models'
import { WeatherConditonIcon } from '../../icons/WeatherConditionIcon'
import { Typography, Box, makeStyles } from '@material-ui/core'
import { capitalize } from 'lodash-es'
import { Units } from '../../../constants/Units'

export interface ICityWeatherComponentProps {
  weatherInfo: IWeatherInfo
  weatherForecaseInfo: IWeatherForecastInfo
  isLoading: boolean
}

const useStyles = makeStyles({
  root : {
    padding: 10,
    width: '100%',
    height: '100%',
    minHeight: '100vh',
  },
  child : {
    marginTop: 50
  },
  text : {
    marginLeft: 24
  },
  titleText : {
    marginLeft: 8
  },
})

/**
* A component to display the current weather conditions for a given city.
* Accepts the response of open weather api as props
*/
export const CityWeatherComponent: React.FC<ICityWeatherComponentProps> = (props: ICityWeatherComponentProps) => {
  const classes = useStyles()
  const getTemperature = (tempKelvin: number | undefined) => {
    if (tempKelvin) {
      return tempKelvin ? Math.round(tempKelvin - 273.15) : 0
    }
  }

  return (
    <>
      <Box m={1} display="flex" justifyContent="center">
        <Typography variant="h6">
          {props.weatherInfo.name}, {props.weatherInfo.sys?.country}
        </Typography>
      </Box>
      <Box m={1} display="flex" justifyContent="center">
        <WeatherConditonIcon
          weatherCondition={
            props.weatherInfo.weather?.length &&
            props.weatherInfo.weather?.length > 0
              ? props.weatherInfo.weather[0].main
              : 'Unknown'
          }
          size={'4x'}
        />
        <Typography variant="h3" className={classes.titleText}>
          {getTemperature(props.weatherInfo.main?.temp)}&#176;C
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center">
        <Typography variant="h6">
          {capitalize(
            props.weatherInfo.weather?.length &&
              props.weatherInfo?.weather?.length > 0
              ? props.weatherInfo?.weather[0]?.description
              : ''
          )}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center">
        <Typography variant="body1">
          {DateTimeUtils.getDayDateMonthTime(
            props.weatherForecaseInfo.current?.dt,
            props.weatherForecaseInfo.timezone
          )}
        </Typography>
      </Box>
      <Box m={1} display="flex" justifyContent="center">
        <Typography className={classes.text} variant="caption">
          Max {getTemperature(props.weatherInfo.main?.temp_max)}&#176;C
        </Typography>
        <Typography className={classes.text} variant="caption">
          Min {getTemperature(props.weatherInfo.main?.temp_min)}&#176;C
        </Typography>
        <Typography className={classes.text} variant="caption">
          Humidity {props.weatherInfo.main?.humidity + Units.Percentage}
        </Typography>
        <Typography className={classes.text} variant="caption">
          Pressure {props.weatherInfo.main?.pressure + Units.Hpa}
        </Typography>
      </Box>
      <Box m={1} display="flex" justifyContent="center">
        <Typography className={classes.text} variant="caption">
          Feels like{' '}
          {getTemperature(props.weatherForecaseInfo.current?.feels_like)}&#176;C
        </Typography>
        <Typography className={classes.text} variant="caption">
          Wind {props.weatherInfo.wind?.speed}
        </Typography>
        <Typography className={classes.text} variant="caption">
          UVI {props.weatherForecaseInfo.current?.uvi}
        </Typography>
        <Typography className={classes.text} variant="caption">
          Visibility {' '}
          {props.weatherForecaseInfo.current?.visibility
            ? Math.round(props.weatherForecaseInfo.current?.visibility / 1000) + Units.Km
            : Units.Empty}
        </Typography>
      </Box>
    </>
  )
}
