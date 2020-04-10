import { IWeatherModel } from "../store/weather/models"

export default class MemoryCacheUtils {
  public static isAlreadyPresent(city:string , weatherModelsMap: Map<string, IWeatherModel>) {
    const cityLowerCase = city.toLowerCase()
    if(weatherModelsMap && weatherModelsMap.has(cityLowerCase)){
      return weatherModelsMap.get(cityLowerCase)
    }
  }

  public static addToCache(city:string , weatherModel: IWeatherModel, weatherModelsMap: Map<string, IWeatherModel>) {
    const cityLowerCase = city.toLowerCase()
    if(weatherModelsMap && weatherModelsMap.has(cityLowerCase)) {
      weatherModelsMap.delete(cityLowerCase)
      weatherModelsMap.set(cityLowerCase, weatherModel)
      return weatherModelsMap
    }
    else {
      if(weatherModelsMap.size < 10 ) {
        weatherModelsMap.set(cityLowerCase, weatherModel)
        return weatherModelsMap
      }
      else {
        const firstKey = weatherModelsMap.keys().next().value
        weatherModelsMap.delete(firstKey)
        weatherModelsMap.set(cityLowerCase, weatherModel)
        return weatherModelsMap
      }
    }
  }
}