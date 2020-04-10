import { Action } from "redux"
import { IAppThunkAction, IApplicationState } from ".."
import Axios, { AxiosRequestConfig } from "axios"
import { IWeatherModel, IWeatherInfo, IWeatherForecastInfo } from "./models"
import MemoryCacheUtils from "../../utils/MemoryCacheUtils"
import appsettings from '../../appsettings.json'

export interface IActionWeatherFetch extends Action {
    type: 'WEATHER_FETCH'
    query: string
  }
  
  export interface IActionWeatherFetchSuccess extends Action {
    type: 'WEATHER_FETCH_SUCCESS'
    weatherModel: IWeatherModel
    query: string
  }
  
  export interface IActionWeatherFetchError extends Action {
    type: 'WEATHER_FETCH_ERROR',
    errorMessage?: string
    errorCode?: number,
    isRequestFailed?:boolean
  }
  
  export type AppAction = IActionWeatherFetch | IActionWeatherFetchSuccess | IActionWeatherFetchError

  export interface IActionCreators {
      getWeatherInfo: (query: string) => IAppThunkAction<AppAction>
  }

  export const actionCreators: IActionCreators = {
    getWeatherInfo: (query: string) : IAppThunkAction<AppAction> => async (dispatch, getState) => {       
        dispatch({
            type: 'WEATHER_FETCH',
            query: query
        })

        const state : IApplicationState = getState()
        const weatherModel: IWeatherModel | undefined = MemoryCacheUtils.isAlreadyPresent(query, state.weather.weatherModelsMap)

        if(weatherModel) {
          dispatch({ type: 'WEATHER_FETCH_SUCCESS', weatherModel: weatherModel, query: query})
          return
        }

        const params = {
          q : query,
          APPID: appsettings.APPID
        }

        const request: AxiosRequestConfig = {
          url: `/data/2.5/weather`,
          method: 'GET',
          params,
          baseURL: appsettings.OPEN_WEATHER_BASE_URL,
        }
    
        try {
          const weatherInfoResponse = await Axios.request<IWeatherInfo>(request)

          const forecastParams = {
            lat : weatherInfoResponse.data.coord?.lat,
            lon : weatherInfoResponse.data.coord?.lon,
            exclude: 'minutely',
            APPID: appsettings.APPID
          }
  
          const forecastRequest: AxiosRequestConfig = {
            url: appsettings.OPEN_WEATHER_ONE_CALL_API,
            method: 'GET',
            params : forecastParams,
            baseURL: appsettings.OPEN_WEATHER_BASE_URL
          }

          try {
            const forecaseResponse = await Axios.request<IWeatherForecastInfo>(forecastRequest)
            dispatch({ 
              type: 'WEATHER_FETCH_SUCCESS', 
              query: query,
              weatherModel: {
                weatherInfo: weatherInfoResponse.data,
                weatherForecastInfo : forecaseResponse.data
              },
            })
          }
          catch(error) {
            dispatch({ 
              type: 'WEATHER_FETCH_ERROR', 
              errorMessage: error.response?.data?.message, 
              errorCode: error.response?.status,
              isRequestFailed: true
            })
          }
        } catch (error) {
            dispatch({ 
              type: 'WEATHER_FETCH_ERROR', 
              errorMessage: error.response?.data?.message, 
              errorCode: error.response?.status,
              isRequestFailed: true
            })
        }
    }
  }