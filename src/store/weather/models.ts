

export interface IWeatherModel {
    weatherInfo: IWeatherInfo
    weatherForecastInfo: IWeatherForecastInfo
}

export interface IWeatherInfo {
    coord?: ICoordinateModel
    weather?: IWeather[]
    main?: IMainModel
    visibility?: number
    wind?: IWindModel
    dt?: number
    sys?: ISysModel
    id?: number
    name?: string
    cod?: number
}

export interface IWeatherForecastInfo {
    lon? : number
    lat? : number
    timezone?: string
    timezone_offset?: number
    current? : ICurrentWeather
    hourly?: ICurrentWeather[]
    daily?: IDailyWeather[]
}

interface IMainModel {
    temp: number
    pressure: number
    humidity: number
    temp_min: number
    temp_max: number
}

interface ICoordinateModel {
    lon : number
    lat : number
}

interface IWeather {
    id: number
    main: string
    description: string
    icon: string
}

interface IWindModel {
    speed : number
    deg: number
}

interface ISysModel {
    type: number
    id: number
    message: number
    country: string
    sunrise: number
    sunset: number
}

export interface ICurrentWeather {
    dt?: number
    sunrise: number
    sunset: number
    temp: number
    feels_like: number
    pressure: number
    humidity: number
    dew_point: number
    uvi: number
    clouds: number
    visibility: number
    wind_speed: number
    wind_deg: number
    weather: IWeather[]
}

export interface IDailyWeather {
    dt?: number
    sunrise: number
    sunset: number
    temp: ITemperatureModel
    feels_like: IFeelsLikeModel
    pressure: number
    humidity: number
    dew_point: number
    uvi: number
    clouds: number
    visibility: number
    wind_speed: number
    wind_deg: number
    weather: IWeather[]
}

interface ITemperatureModel {
    day: number
    min: number
    max: number
    night: number
    eve : number
    morn : number
}

interface IFeelsLikeModel {
    day: number
    night: number
    eve : number
    morn : number
}