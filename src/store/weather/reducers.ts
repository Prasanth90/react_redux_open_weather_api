import { IWeatherState } from "../index"
import { AppAction } from "./actions"
import MemoryCacheUtils from "../../utils/MemoryCacheUtils"

export function reducer(currentState: IWeatherState, action: AppAction): IWeatherState {
    if(action.type === 'WEATHER_FETCH'){
        return {
            ...currentState,
            isLoading:true,
            isRequestFailed: false,
        }   
    }

    if(action.type === 'WEATHER_FETCH_SUCCESS'){
        const weatherModelsMap = MemoryCacheUtils.addToCache(action.query, action.weatherModel, currentState.weatherModelsMap)
        return {
            ...currentState,
            errorMessage: '',
            errorCode: undefined,
            isLoading: false,
            isRequestFailed: false,
            weatherModel: action.weatherModel,
            weatherModelsMap: weatherModelsMap
        }  
    }

    if(action.type === 'WEATHER_FETCH_ERROR'){
        return {
            ...currentState,
            isLoading: false,
            errorMessage: action.errorMessage,
            errorCode: action.errorCode,
            isRequestFailed: action.isRequestFailed
        }   
    }

    return currentState
}