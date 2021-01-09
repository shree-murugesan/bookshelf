import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Star, StarHalf } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  star: {
    color: '#ffb400',
    position: 'relative',
    verticalAlign: 'middle',
    display: 'inline-flex',
  },
  inlineDiv: {
    display: 'inline-block',
  }
}));

export default function RatingView(props) {
  const classes = useStyles();
  const { rating } = props;
  if (rating) {
    return (
      <div className={classes.inlineDiv}>
        {Array.from(Array(rating - (rating % 1)), (_, i) => <Star key={i} className={classes.star} />)}
        {(rating % 1 !== 0) ? <StarHalf className={classes.star} /> : ''}
      </div>
    );

  } else {
    return (
      <div className={classes.inlineDiv}>N/A</div>
    )
  }
}