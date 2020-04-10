import React from 'react'
import ItemsCarousel from 'react-items-carousel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons'
import {
  ICurrentWeather,
  IWeatherInfo,
  IWeatherForecastInfo,
} from '../../store/weather/models'
import { HourlyWeatherCard } from '../cards/HourlyWeatherCard'
import { useTheme, useMediaQuery, IconButton, makeStyles } from '@material-ui/core'
import { WeatherTerminology } from '../../constants/WeatherTerminology'

interface IHourlyWeatherCarouselProps {
  weatherInfo: IWeatherInfo
  weatherForecaseInfo: IWeatherForecastInfo
  setActiveCarouselItemIndex: any
  activeCarouselItemIndex: number
}

const useStyles = makeStyles({
  iconButton : {
    width: 36, 
    height: 36
  }
})

/**
 * A carousel of cards to display the weather conditions of a city for a set for hours
 * 
 * react-items-carousel is used to render the carousel
 * 
 * Mobile Responsive
 */

export const HourlyWeatherCarousel: React.FC<IHourlyWeatherCarouselProps> = (props: IHourlyWeatherCarouselProps) => {

  const theme = useTheme()
  const classes = useStyles()
  const xs = useMediaQuery(theme.breakpoints.up('xs'))
  const sm = useMediaQuery(theme.breakpoints.up('sm'))
  const md = useMediaQuery(theme.breakpoints.up('md'))
  const lg = useMediaQuery(theme.breakpoints.up('lg'))
  const xl = useMediaQuery(theme.breakpoints.up('xl'))

  const getTemperature = React.useCallback((tempKelvin: number | undefined) => {
    if (tempKelvin) {
      return tempKelvin ? Math.round(tempKelvin - 273.15) : 0
    }
  }, [])

  const hourlyCards = () => {
    return props.weatherForecaseInfo.hourly?.map(
      (hourlyData: ICurrentWeather) => {
        return (
          <HourlyWeatherCard
            key={hourlyData.dt}
            temperature={getTemperature(hourlyData.temp)}
            time={hourlyData.dt}
            timezone={props.weatherForecaseInfo.timezone}
            weatherCondition={
              hourlyData.weather.length > 0
                ? hourlyData.weather[0].main
                : WeatherTerminology.UnknownWeather
            }
            weatherDescription={
              hourlyData.weather.length > 0
                ? hourlyData.weather[0].description
                : WeatherTerminology.UnknownWeather
            }
          />
        )
      }
    )
  }

  const getCardCount = () => {
    if (xl) return 10
    if (lg) return 8
    if (md) return 6
    if (sm) return 4
    if (xs) return 2
    return 1
  }

  return (
    <ItemsCarousel
      requestToChangeActive={props.setActiveCarouselItemIndex}
      activeItemIndex={props.activeCarouselItemIndex}
      numberOfCards={getCardCount()}
      gutter={20}
      leftChevron={
        <IconButton className={classes.iconButton}>
          <FontAwesomeIcon icon={faChevronLeft} size="sm" />
        </IconButton>
      }
      rightChevron={
        <IconButton className={classes.iconButton}>
          <FontAwesomeIcon icon={faChevronRight} size="sm" />
        </IconButton>
      }
      outsideChevron
      chevronWidth={40}
    >
      {hourlyCards() || []}
    </ItemsCarousel>
  )
}
