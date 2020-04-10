import React from 'react'
import { Typography, Box, Hidden, makeStyles } from '@material-ui/core'
import { ReactComponent as NotFoundSvg } from '../../../images/notfound.svg'
import { ReactComponent as ErrorSvg } from '../../../images/error.svg'
import { capitalize } from 'lodash-es'
import { ErrorMessages } from '../../../constants/ErrorMessages'
import { PlaceholderMessages } from '../../../constants/PlaceholderMessages'

export interface IErrorViewprops {
  errorMessage?: string
  errorCode?: number
}

interface IErrorInfo {
  icon: React.ReactNode
  errorDescription: string
}

const useStyles = makeStyles({
  logo : {
    height: 350,
    maxWidth: 350,
    minWidth: 350,
    width: 350
  },
  text : {
    marginTop: 8
  },
  box : {
    width: 350
  }
})

/**
* A component to display error information [For example: City not found/Network unavailable].
* Accepts error code and error message as props
*/

export const ErrorView: React.FC<IErrorViewprops> = (
  props: IErrorViewprops
) => {
  const classes = useStyles()
  const notFoundErrorInfo: IErrorInfo = {
    icon: (
      <NotFoundSvg
        fill="#fff"
        className={classes.logo}
      />
    ),
    errorDescription: ErrorMessages.NotFound
  }
  const generalErrorInfo: IErrorInfo = {
    icon: (
      <ErrorSvg
        fill="#fff"
        className={classes.logo}
      />
    ),
    errorDescription: ErrorMessages.UnknownError
  }

  const icon =
    props.errorCode === 404 ? notFoundErrorInfo.icon : generalErrorInfo.icon
  const errorDescription =
    props.errorCode === 404
      ? notFoundErrorInfo.errorDescription
      : generalErrorInfo.errorDescription

  return (
    <Box display="flex" justifyContent="center">
      <Hidden mdDown>
        <Box mr={10}>{icon}</Box>
      </Hidden>
      <Box className={classes.box}>
        <Typography variant="h1">
          {PlaceholderMessages.OOPS}
        </Typography>
        <Typography variant="h4" className={classes.text}>
          {capitalize(props.errorMessage || PlaceholderMessages.UnknownError)} !!!
        </Typography>
        {errorDescription && (
          <Typography variant="h6" className={classes.text}>
            {errorDescription}
          </Typography>
        )}
      </Box>
    </Box>
  )
}
