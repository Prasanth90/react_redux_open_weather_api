import React from 'react'
import {
  Typography,
  Grid,
  Box,
  Backdrop,
  CircularProgress,
  makeStyles,
} from '@material-ui/core'
import { IApplicationState } from '../../../store'
import { connect } from 'react-redux'
import { actionCreators } from '../../../store/weather/actions'
import { bindActionCreators } from 'redux'
import {
  IWeatherInfo,
  IWeatherForecastInfo,
} from '../../../store/weather/models'
import { WeatherForecastTable } from '../../tables/WeatherForecastTable'
import { CityWeatherComponent } from './CityWeatherComponent'
import { WeatherToolbar } from '../../bars/Toolbar'
import { WelcomeComponent } from './WelcomeComponent'
import { ErrorView } from '../errors/ErrorView'
import { HourlyWeatherCarousel } from '../../carousels/HourlyWeatherCarousel'
import { WeatherTerminology as WT } from '../../../constants/WeatherTerminology'

export interface IWeatherViewStateProps {
  isLoading: boolean
  weatherInfo: IWeatherInfo
  weatherForecaseInfo: IWeatherForecastInfo
  isError: boolean
  errorMessage?: string
  errorCode?: number
}
export interface IWeatherViewDispatchProps {
  getWeatherInfo: (query: string) => void
}

export interface IWeatherViewAllProps
  extends IWeatherViewStateProps,
  IWeatherViewDispatchProps {}

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
      marginTop: 8
    },
  })

/**
 * Home page of the app. 
 * Displays current weather conditions of a city
 * Displays hourly weather forecast for the next 48 hours
 * Displays daily forecast for the next 7 days
 * Mobile Responsive
 * Mostly uses material-ui components
 */
export const WeatherView: React.FC<IWeatherViewAllProps> = (props: IWeatherViewAllProps) => {
  const [searchText, setSearchText] = React.useState<string>()
  const [activeCarouselItemIndex, setActiveCarouselItemIndex] = React.useState(0)
  const classes = useStyles()

  return (
    <Grid
      container
      spacing={1}
      className={classes.root}
    >
      <Grid item xs={12}>
        <WeatherToolbar
          onSearchClicked={(query: string) => {
            setSearchText(query)
            props.getWeatherInfo(query)
            setActiveCarouselItemIndex(0)
          }}
          isloading={props.isLoading}
        />
      </Grid>
      <Grid
        container
        spacing={1}
        className={classes.child}
      >
        {!searchText && (
          <Grid item xs={12}>
            <WelcomeComponent />
          </Grid>
        )}

        {/* A backdrop spinner when we make api calls*/}
        {props.isLoading && (
          <Backdrop open={props.isLoading}>
            <CircularProgress />
          </Backdrop>
        )}

        {searchText && !props.isError && !props.isLoading && (
          <>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <CityWeatherComponent
                weatherForecaseInfo={props.weatherForecaseInfo}
                weatherInfo={props.weatherInfo}
                isLoading={props.isLoading}
              />
              <Box mb={2} />
              <Typography variant="h6" className={classes.text}>
                {WT.HourlyForecast}
              </Typography>
              <Box mb={2} />
              <Grid item xs={12}>
                <HourlyWeatherCarousel
                  weatherForecaseInfo={props.weatherForecaseInfo}
                  weatherInfo={props.weatherInfo}
                  setActiveCarouselItemIndex={setActiveCarouselItemIndex}
                  activeCarouselItemIndex={activeCarouselItemIndex}
                />
              </Grid>
              <Box mb={2} />
              <Grid item xs={12}>
                <WeatherForecastTable
                  weatherForecaseInfo={props.weatherForecaseInfo}
                  weatherInfo={props.weatherInfo}
                  isLoading={props.isLoading}
                />
              </Grid>
            </Grid>
          </>
        )}

        {searchText && props.isError && (
          <Grid item xs={12}>
            <ErrorView
              errorMessage={props.errorMessage}
              errorCode={props.errorCode}
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}

function mapStateToProps(state: IApplicationState): IWeatherViewStateProps {
  return {
    weatherInfo: state.weather.weatherModel?.weatherInfo,
    weatherForecaseInfo: state.weather.weatherModel?.weatherForecastInfo,
    isLoading: state.weather.isLoading,
    isError: state.weather.isRequestFailed || false,
    errorMessage: state.weather.errorMessage,
    errorCode: state.weather.errorCode,
  }
}

function mapDispatchToProps(dispatch: any): IWeatherViewDispatchProps {
  return {
    ...bindActionCreators(
      {
        getWeatherInfo: (query: string) => actionCreators.getWeatherInfo(query),
      },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherView)
