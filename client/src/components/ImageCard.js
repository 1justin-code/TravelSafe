import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Collapse } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 445,
    background: "rgba(0,0,0,0.5)",
    margin: "0px",
  },
  media: {
    height: 340,
  },
  title: {
    fontFamily: "Nunito",
    fontWeight: "bold",
    fontSize: "2rem",
    color: "#fff",
  },
  desc: {
    fontFamily: "Nunito",
    fontSize: "1.1rem",
    color: "#ddd",
  },
});

export default function ImageCard({ place, checked }) {
  const classes = useStyles();
  let navigate = useNavigate();

  return (
    <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})}>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={place.imageUrl}
          title='Contemplative Reptile'
          onClick={() => {
            navigate(place.placeNav);
          }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant='h5'
            component='h1'
            className={classes.title}
            onClick={() => {
              navigate(place.placeNav);
            }}
          >
            {place.title}
          </Typography>
          <Typography
            variant='body2'
            color='textSecondary'
            component='p'
            className={classes.desc}
          >
            {place.description}
          </Typography>
        </CardContent>
      </Card>
    </Collapse>
  );
}
