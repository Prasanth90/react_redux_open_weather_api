import React from 'react'
import MaterialTable from 'material-table'
import DateTimeUtils from '../../utils/DateTimeUtils'
import { Typography, useMediaQuery, useTheme } from '@material-ui/core'
import {
  IWeatherInfo,
  IWeatherForecastInfo,
  IDailyWeather,
} from '../../store/weather/models'
import { WeatherConditonIcon } from '../icons/WeatherConditionIcon'
import { WeatherTerminology as WT } from '../../constants/WeatherTerminology'
import { Units } from '../../constants/Units'

export interface IWeatherForecastTableProps {
  weatherInfo: IWeatherInfo
  weatherForecaseInfo: IWeatherForecastInfo
  isLoading: boolean
}

/**
 * A table to display the weather condition of a city for a set of days
 * 
 * MaterialTable from 'material-table' is used to display the information
 * 
 * Mobile Responsive
 */

export const WeatherForecastTable: React.FC<IWeatherForecastTableProps> = (
  props: IWeatherForecastTableProps
) => {
  const theme = useTheme()
  const xs = useMediaQuery(theme.breakpoints.up('xs'))
  const sm = useMediaQuery(theme.breakpoints.up('sm'))
  const md = useMediaQuery(theme.breakpoints.up('md'))
  const lg = useMediaQuery(theme.breakpoints.up('lg'))
  const xl = useMediaQuery(theme.breakpoints.up('xl'))

  const getTemperature = (tempKelvin: number | undefined) => {
    if (tempKelvin) {
      return tempKelvin ? Math.round(tempKelvin - 273.15) : 0
    }
  }

  const getColumns = () => {
    const columns = [
      {
        title: WT.Date,
        field: 'date',
        render: (rowData: IDailyWeather) => (
          <Typography>
            {DateTimeUtils.getDayDateMonth(
              rowData.dt,
              props.weatherForecaseInfo.timezone
            )}
          </Typography>
        ),
      },
      {
        title: WT.MaxTemp,
        field: 'max',
        render: (rowData: IDailyWeather) => (
          <Typography>{getTemperature(rowData.temp.max)}&#176;C</Typography>
        ),
      },
      {
        title: WT.MinTemp,
        field: 'min',
        render: (rowData: IDailyWeather) => (
          <Typography>{getTemperature(rowData.temp.min)}&#176;C</Typography>
        ),
      },
      {
        title: WT.Sunrise,
        field: 'sunrise',
        render: (rowData: IDailyWeather) => (
          <Typography>
            {DateTimeUtils.getTimeWithMins(
              rowData.sunrise,
              props.weatherForecaseInfo.timezone
            )}
          </Typography>
        ),
      },
      {
        title: WT.Sunset,
        field: 'sunset',
        render: (rowData: IDailyWeather) => (
          <Typography>
            {DateTimeUtils.getTimeWithMins(
              rowData.sunset,
              props.weatherForecaseInfo.timezone
            )}
          </Typography>
        ),
      },
      {
        title: WT.Humidity,
        field: 'humididity',
        render: (rowData: IDailyWeather) => (
          <Typography>{rowData.humidity + Units.Percentage}</Typography>
        ),
      },
      {
        title: WT.UVIndex,
        field: 'uvi',
        render: (rowData: IDailyWeather) => (
          <Typography>{rowData.uvi}</Typography>
        ),
      },
      {
        title: WT.Condition,
        field: 'condition',
        render: (rowData: IDailyWeather) => (
          <WeatherConditonIcon
            weatherCondition={
              rowData.weather.length > 0 ? rowData.weather[0].main : WT.UnknownWeather
            }
          />
        ),
      },
    ]

    if (xl) {
      return [
        columns[0],
        columns[1],
        columns[2],
        columns[3],
        columns[4],
        columns[5],
        columns[6],
        columns[7],
      ]
    }

    if (lg) {
      return [columns[0], columns[1], columns[2], columns[6], columns[7]]
    }

    if (sm || md) {
      return [columns[0], columns[1], columns[2], columns[7]]
    }

    if (xs) {
      return [columns[0], columns[6], columns[7]]
    }

    return columns
  }

  return (
    <MaterialTable
      columns={getColumns()}
      data={(!props.isLoading && props.weatherForecaseInfo?.daily) || []}
      title={<Typography variant="h6">{WT.DailyForecast}</Typography>}
      options={{
        paging: false,
        search: false,
        sorting: false,
      }}
    />
  )
}
