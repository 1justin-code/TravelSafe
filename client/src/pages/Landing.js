import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import Header from "../components/Header";
import PlaceToVisit from "../components/PlaceToVisit";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "10vh",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/bg10.jpeg"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));
export default function Landing() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <PlaceToVisit />
    </div>
  );
}
