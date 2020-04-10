import React from 'react'
import { Typography, Box, Hidden, makeStyles } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudSunRain } from '@fortawesome/free-solid-svg-icons'
import { PlaceholderMessages } from '../../../constants/PlaceholderMessages'

const useStyles = makeStyles({
  text : {
    marginTop: 8
  },
  box : {
    width: 350
  }
})
/**
 * A component to display the app logo and getting started information
 */
export const WelcomeComponent: React.FC = () => {
  const classes = useStyles()
  return (
    <Box m={1} display="flex" justifyContent="center">
      <Hidden mdDown>
        <FontAwesomeIcon
          style={{ width: 300, height: 300, marginRight: 64 }}
          icon={faCloudSunRain}
        />
      </Hidden>
      <Box className={classes.box}>
        <Typography variant="h1">
          {PlaceholderMessages.AppName}
        </Typography>
        <Typography variant="h6" className={classes.text}>
          {PlaceholderMessages.GettingStartedMessage}
        </Typography>
      </Box>
    </Box>
  )
}
