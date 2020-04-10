import { Card, CardContent, Typography, Box, Tooltip, makeStyles } from '@material-ui/core'
import React from 'react'
import DateTimeUtils from '../../utils/DateTimeUtils'
import { WeatherConditonIcon } from '../icons/WeatherConditionIcon'

interface IHourlyWeatherCardProps {
  temperature?: number
  time?: number
  timezone?: string
  weatherCondition: string
  weatherDescription: string
}

const useStyles = makeStyles({
  card: {
    width: 140, 
    height: 180
  }
})

/**
 * A card to display the weather condition of a city for the given hour
 */
export const HourlyWeatherCard: React.FC<IHourlyWeatherCardProps> = (
  props: IHourlyWeatherCardProps
) => {
  const cardClasses = useStyles()

  return (
    <Card className={cardClasses.card}>
      <CardContent>
        <Box mb={1} />
        <Typography color="textSecondary" gutterBottom variant="h5">
          {props.temperature}&#176;C
        </Typography>
        <Box mb={1} />
        <Tooltip title={props.weatherDescription} placement="bottom">
          <Box display="flex" justifyContent="center">      
            <WeatherConditonIcon weatherCondition={props.weatherCondition} />
          </Box>
        </Tooltip>
        <Box mb={2} />
        <Typography color="textSecondary" gutterBottom variant="h5">
          {DateTimeUtils.getTime(props.time, props.timezone)}
        </Typography>
      </CardContent>
    </Card>
  )
}
