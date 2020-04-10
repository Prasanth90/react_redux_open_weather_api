import React from 'react'
import {
  TextField,
  Box,
  IconButton,
  InputAdornment,
  CircularProgress,
  AppBar,
  makeStyles,
} from '@material-ui/core'
import {
  faTimes,
  faSearch,
  faCloudSunRain,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PlaceholderMessages } from '../../constants/PlaceholderMessages'

export interface IToolbarProps {
  onSearchClicked: (query: string) => void
  isloading: boolean
}

const useStyles = makeStyles({
  adornment : {
    margin: 0,
    width: 36
  },
  iconButton : {
    height: 36, 
    width: 36
  },
  input : {
    padding: 0
  },
  progress : {
    color: '#fff'
  }
})

export const WeatherToolbar: React.FC<IToolbarProps> = (
  props: IToolbarProps
) => {
  const [searchText, setSearchText] = React.useState<string>('')
  const classes = useStyles()

  React.useEffect(() => {
    if (searchText) {
      props.onSearchClicked(searchText)
    }
  }, []) // eslint-disable-line

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      props.onSearchClicked(e.target.value)
    }
  }

  return (
    <AppBar>
      <Box
        alignItems="center"
        display="flex"
        justifyContent="space-between"
        p={1}
        bgcolor="secondary.main"
      >
        <FontAwesomeIcon
          color="white"
          style={{
            width: 72, 
            height: 36, 
            marginLeft: 8
          }}
          icon={faCloudSunRain}
        />
        <Box display="flex" alignItems="center" justifyContent="end">
          <TextField
            id={'search-box'}
            value={searchText}
            disabled={props.isloading}
            fullWidth
            hiddenLabel
            autoFocus
            placeholder={PlaceholderMessages.SearchCity}
            onChange={(e) => {
              setSearchText(e.target.value)
            }}
            onKeyDown={handleKeyDown}
            InputProps={{
              className: classes.input,
              autoFocus: true,
              endAdornment: (
                <Box>
                  <InputAdornment
                    position="end"
                    className={classes.adornment}
                  >
                    <Box hidden={!searchText}>
                      <IconButton
                        className={classes.iconButton}
                        hidden={!searchText}
                        onClick={() => {
                          setSearchText('')
                        }}
                        size="small"
                      >
                        <FontAwesomeIcon icon={faTimes} size="sm" />
                      </IconButton>
                    </Box>
                  </InputAdornment>
                </Box>
              ),
              margin: 'dense',
              startAdornment: (
                <Box>
                  <InputAdornment position="start" className={classes.adornment}>
                    <IconButton
                      disabled={false}
                      onClick={() => {
                        props.onSearchClicked(searchText)
                      }}
                      size="small"
                      className={classes.iconButton}
                    >
                      {props.isloading ? (
                        <CircularProgress size={15} className={classes.progress} />
                      ) : (
                        <FontAwesomeIcon icon={faSearch} size="sm" />
                      )}
                    </IconButton>
                  </InputAdornment>
                </Box>
              )
            }}
          />
        </Box>
      </Box>
    </AppBar>
  )
}
