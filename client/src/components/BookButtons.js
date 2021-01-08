import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { TBR, READ, CURRENTLY_READING } from '../constants.js';
import { Button } from '@material-ui/core';
import indigo from '@material-ui/core/colors/indigo';


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: indigo[700],
    '&:hover': {
      backgroundColor: indigo[900],
    },
  },
}));

export default function BookButtons(props) {
    const classes = useStyles();
    const {status} = props;

    if (status === TBR) {
      return (
        <Button
          size="small"
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={() => { props.onUpdateStatus(CURRENTLY_READING) }}>
          Start Reading
        </Button>
      );
    } else if (status === READ) {
      return (
        <Button
          size="small"
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={() => { props.onUpdateStatus(CURRENTLY_READING) }}>
          Read Again
        </Button>
      );
    } else {
      return (
        <div>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={() => { props.onRead() }}>
            Finish Reading
          </Button> <br/>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={() => { props.onUpdateStatus(TBR) }}>
            Stop Reading
          </Button>
        </div>
      );
    }
    
}
