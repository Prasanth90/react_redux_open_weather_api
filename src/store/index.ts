import { IWeatherModel } from "./weather/models";
import { Action } from "redux";
import {reducer as weatherReducer} from './weather/reducers'

export interface IApplicationState {
    weather: IWeatherState
}

export interface IWeatherState {
    isLoading: boolean
    weatherModel: IWeatherModel
    weatherModelsMap: Map<string, IWeatherModel>
    errorMessage?: string
    errorCode?:number
    isRequestFailed?:boolean
}

export const defaultWeatherState : IWeatherState = {
    isLoading: false,
    weatherModel: {
        weatherInfo : {
            name: 'No City'
        },
        weatherForecastInfo : {}
    },
    weatherModelsMap: new Map<string, IWeatherModel>(),
    errorMessage: ''
}

export const defaultApplicationState: IApplicationState = {
    weather: defaultWeatherState
}

export function mainReducer(state: IApplicationState = defaultApplicationState, action: Action) {
    return {
      weather: weatherReducer(state.weather, action)
    };
}

export interface IAppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => IApplicationState): void
}